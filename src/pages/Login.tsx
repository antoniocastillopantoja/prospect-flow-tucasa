
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
    <div className="min-h-screen flex flex-col">
      <div className="tucasaideal-header">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/9cd54036-11d1-4009-85e7-62990da8b2c2.png" 
            alt="Tucasaideal Logo" 
            className="h-12 w-auto mr-4"
          />
          <h1 className="text-xl font-bold">Consultores en bienes raíces</h1>
        </div>
        <div className="text-xl font-bold">
          Vendemos tu casa de 1 a 60 días
        </div>
      </div>
      
      <div className="tucasaideal-subheader">
        <div className="flex space-x-8">
          <div className="flex flex-col items-center text-xs">
            <Home className="h-6 w-6 text-crm-gold" />
            <span>Inicio</span>
          </div>
          <div className="flex flex-col items-center text-xs">
            <Handshake className="h-6 w-6 text-crm-gold" />
            <span>Vende</span>
          </div>
          <div className="flex flex-col items-center text-xs">
            <Search className="h-6 w-6 text-crm-gold" />
            <span>Buscar</span>
          </div>
          <div className="flex flex-col items-center text-xs">
            <MapPin className="h-6 w-6 text-crm-gold" />
            <span>Búscame</span>
          </div>
          <div className="flex flex-col items-center text-xs">
            <MessageSquare className="h-6 w-6 text-crm-gold" />
            <span>News</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="w-full max-w-md">
          <Card className="border-crm-red border-t-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-center text-crm-red">CRM TuCasaIdeal</CardTitle>
              <CardDescription className="text-center">
                Ingresa tus credenciales para acceder al sistema
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleLogin}>
              <CardContent className="pt-4">
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
                      <a href="#" className="text-sm text-crm-red hover:underline">
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
                <Button 
                  type="submit" 
                  className="w-full bg-crm-red hover:bg-crm-darkRed text-white" 
                  disabled={isLoading}
                >
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
    </div>
  );
}

export default Login;
