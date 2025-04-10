
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication - this would be replaced with actual auth
    setTimeout(() => {
      setIsLoading(false);
      if (email === "demo@tucasaideal.com" && password === "password") {
        navigate("/");
      } else {
        toast({
          title: "Error de autenticación",
          description: "Credenciales incorrectas. Intenta nuevamente.",
          variant: "destructive"
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img 
            src="/lovable-uploads/9cd54036-11d1-4009-85e7-62990da8b2c2.png" 
            alt="Tucasaideal Logo" 
            className="mx-auto mb-4 max-h-20"
          />
          <h1 className="text-2xl font-bold text-gray-800">CRM TuCasaIdeal</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Iniciar sesión</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder al sistema
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="ejemplo@tucasaideal.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Contraseña</Label>
                    <a href="#" className="text-sm text-primary hover:underline">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="text-center mt-4 text-sm text-gray-600">
          <p>Demo: demo@tucasaideal.com / password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
