
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/types/settings";
import { useToast } from "@/hooks/use-toast";
import { generateTemporaryPassword } from "@/utils/passwordUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define schema for user edit form validation
export const userEditSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Correo electrónico inválido" }),
  role: z.string({ required_error: "Por favor selecciona un rol" }),
  temporaryPassword: z.string().optional()
});

export type UserEditValues = z.infer<typeof userEditSchema>;

interface EditUserDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateUser: (userId: string, data: UserEditValues) => void;
}

export const EditUserDialog = ({ user, open, onOpenChange, onUpdateUser }: EditUserDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasTempPassword, setHasTempPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [temporaryPassword, setTemporaryPassword] = useState("");
  
  const form = useForm<UserEditValues>({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role.toLowerCase() || "",
      temporaryPassword: ""
    },
    values: {
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role.toLowerCase() || "",
      temporaryPassword: temporaryPassword || ""
    }
  });

  // Check if the user has a temporary password
  useEffect(() => {
    if (user?.email) {
      const tempPasswords = JSON.parse(localStorage.getItem("tempPasswords") || "{}");
      const hasTemp = !!tempPasswords[user.email];
      setHasTempPassword(hasTemp);
      
      if (hasTemp) {
        setTemporaryPassword(tempPasswords[user.email]);
        form.setValue("temporaryPassword", tempPasswords[user.email]);
      }
    }
  }, [user?.email, form]);

  const generateNewPassword = () => {
    const newPassword = generateTemporaryPassword();
    setTemporaryPassword(newPassword);
    form.setValue("temporaryPassword", newPassword);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (data: UserEditValues) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      // Update user data
      onUpdateUser(user.id, data);
      
      // Update temporary password in localStorage if provided
      if (data.temporaryPassword) {
        const tempPasswords = JSON.parse(localStorage.getItem("tempPasswords") || "{}");
        tempPasswords[data.email] = data.temporaryPassword;
        localStorage.setItem("tempPasswords", JSON.stringify(tempPasswords));
        setHasTempPassword(true);
      }
      
      // Show success toast
      toast({
        title: "Usuario actualizado",
        description: "Los datos del usuario han sido actualizados correctamente."
      });
      
      // Close the dialog
      onOpenChange(false);
    } catch (error) {
      // Show error toast
      toast({
        title: "Error",
        description: "Ocurrió un error al actualizar el usuario.",
        variant: "destructive"
      });
      console.error("Error updating user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Usuario</DialogTitle>
          <DialogDescription>
            Actualiza la información del usuario. Haz clic en guardar cuando termines.
          </DialogDescription>
        </DialogHeader>
        
        {user && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name">Nombre completo</Label>
                    <FormControl>
                      <Input id="name" placeholder="Juan Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">Correo electrónico</Label>
                    <FormControl>
                      <Input id="email" type="email" placeholder="juan@tucasaideal.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="role">Rol</Label>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Selecciona un rol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="prospectador">Prospectador</SelectItem>
                        <SelectItem value="cerrador">Cerrador</SelectItem>
                        <SelectItem value="gerente">Gerente</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {hasTempPassword && (
                <FormField
                  control={form.control}
                  name="temporaryPassword"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <Label htmlFor="temporaryPassword">Contraseña temporal</Label>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={generateNewPassword}
                          className="h-7 px-2"
                        >
                          <RefreshCw className="h-3.5 w-3.5 mr-1" /> Regenerar
                        </Button>
                      </div>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            id="temporaryPassword" 
                            type={showPassword ? "text" : "password"}
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={togglePasswordVisibility}
                          className="absolute right-0 top-0 h-full px-3"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        El usuario deberá cambiar esta contraseña en su primer inicio de sesión
                      </p>
                    </FormItem>
                  )}
                />
              )}
              
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando..." : "Guardar cambios"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
