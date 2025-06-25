import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTemporaryPassword } from "@/utils/passwordUtils";
import ChangePasswordDialog from "@/components/auth/ChangePasswordDialog";
import { createClient } from '@supabase/supabase-js';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTemporaryPasswordDetected, setIsTemporaryPasswordDetected] = useState<boolean>(false);
  const [tempLoginEmail, setTempLoginEmail] = useState<string>("");
  const [tempLoginPassword, setTempLoginPassword] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay un usuario en localStorage al cargar la aplicación
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Consulta directa a la tabla users
      const { data: user, error } = await supabase
        .from('users')
        .select('id, full_name, email, status, password')
        .eq('email', email)
        .single();
      if (error || !user) throw new Error('Usuario no encontrado');
      if (password !== user.password) throw new Error('Contraseña incorrecta');
      // Consulta el rol del usuario
      const { data: userRole } = await supabase
        .from('user_roles')
        .select('role_id')
        .eq('user_id', user.id)
        .single();
      let roleName = 'Sin rol';
      if (userRole && userRole.role_id) {
        const { data: role } = await supabase
          .from('roles')
          .select('name')
          .eq('id', userRole.role_id)
          .single();
        if (role && role.name) {
          roleName = role.name;
        }
      }
      // Elimina el campo password antes de guardar
      delete user.password;
      user.role = roleName;
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/");
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (newPassword: string) => {
    // En una implementación real, esto sería una llamada a la API para cambiar la contraseña
    try {
      setIsLoading(true);
      
      // Eliminar la contraseña temporal del storage
      const tempPasswords = JSON.parse(localStorage.getItem("tempPasswords") || "{}");
      if (tempPasswords[tempLoginEmail]) {
        delete tempPasswords[tempLoginEmail];
        localStorage.setItem("tempPasswords", JSON.stringify(tempPasswords));
      }
      
      // Simular login exitoso con la nueva contraseña
      if (tempLoginEmail === "demo@tucasaideal.com") {
        const userData: User = {
          id: "1",
          name: "Juan Pérez",
          email: "demo@tucasaideal.com",
          role: "Gerente",
        };
        
        // Guardar usuario en localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        navigate("/");
      }
      
      // Reiniciar el estado de contraseña temporal
      setIsTemporaryPasswordDetected(false);
      setTempLoginEmail("");
      setTempLoginPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
      <ChangePasswordDialog 
        open={isTemporaryPasswordDetected}
        onOpenChange={setIsTemporaryPasswordDetected}
        onPasswordChange={handlePasswordChange}
        email={tempLoginEmail}
      />
    </AuthContext.Provider>
  );
};
