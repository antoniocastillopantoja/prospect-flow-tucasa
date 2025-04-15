
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";
import ForgotPasswordModal from "@/components/auth/ForgotPasswordModal";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="mb-0 w-full bg-white rounded-t-lg overflow-hidden">
          <img 
            src="/lovable-uploads/b569cc80-e658-4bff-950f-e93c7fbbcfb5.png" 
            alt="Tu Casa Ideal" 
            className="w-full h-auto object-contain"
          />
        </div>
        
        <Card className="shadow-lg rounded-t-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-center text-primary text-2xl">Sistema CRM</CardTitle>
            <CardDescription className="text-center">
              Ingresa tus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          
          <LoginForm onForgotPassword={() => setForgotPasswordOpen(true)} />
        </Card>
        
        <div className="text-center mt-6 space-y-4">
          <div className="text-sm text-gray-600">
            <p className="font-medium">Credenciales de demostración:</p>
            <p>Usuario: demo@tucasaideal.com</p>
            <p>Contraseña: password</p>
          </div>
        </div>
      </div>
      
      <ForgotPasswordModal 
        open={forgotPasswordOpen} 
        onOpenChange={setForgotPasswordOpen} 
      />
    </div>
  );
}

export default Login;
