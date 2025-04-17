
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { sendInvitationEmail } from "@/utils/emailUtils";
import { generateTemporaryPassword } from "@/utils/passwordUtils";

// Define schema for user form validation
export const userFormSchema = z.object({
  fullName: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Correo electrónico inválido" }),
  role: z.string({ required_error: "Por favor selecciona un rol" })
});

export type UserFormValues = z.infer<typeof userFormSchema>;

interface UserFormProps {
  onAddUser: (data: UserFormValues & { temporaryPassword: string }) => void;
}

export const UserForm = ({ onAddUser }: UserFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [temporaryPassword, setTemporaryPassword] = useState("");
  
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      role: ""
    }
  });

  const handleSubmit = async (data: UserFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Generate a temporary password
      const tempPassword = generateTemporaryPassword();
      setTemporaryPassword(tempPassword);
      
      // Send invitation email with temporary password
      const emailSent = await sendInvitationEmail(
        data.email,
        data.fullName,
        data.role,
        tempPassword
      );
      
      if (emailSent) {
        // Add the user to the system with temporary password flag
        onAddUser({
          ...data,
          temporaryPassword: tempPassword
        });
        
        // Show success toast
        toast({
          title: "Usuario añadido",
          description: "Se ha enviado un correo de invitación al nuevo usuario con su contraseña temporal."
        });
        
        // Reset form after displaying the password
        setTimeout(() => {
          form.reset();
          setTemporaryPassword("");
        }, 10000); // Clear after 10 seconds
      } else {
        // Show error toast
        toast({
          title: "Error",
          description: "No se pudo enviar el correo de invitación. Intente nuevamente.",
          variant: "destructive"
        });
      }
    } catch (error) {
      // Show error toast
      toast({
        title: "Error",
        description: "Ocurrió un error al procesar la solicitud.",
        variant: "destructive"
      });
      console.error("Error adding user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="fullName">Nombre completo</Label>
                <FormControl>
                  <Input id="fullName" placeholder="Juan Pérez" {...field} />
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
        </div>
        
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="role">Rol</Label>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
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
        
        {temporaryPassword && (
          <div className="p-4 border rounded-md bg-yellow-50 border-yellow-200 space-y-2">
            <div className="font-medium text-yellow-800">Contraseña temporal generada</div>
            <div className="flex items-center justify-between">
              <code className="bg-white px-2 py-1 rounded border">{temporaryPassword}</code>
              <div className="text-xs text-yellow-700">
                Esta contraseña solo se mostrará una vez
              </div>
            </div>
            <p className="text-sm text-yellow-700">
              Se le solicitará al usuario que cambie esta contraseña en su primer inicio de sesión.
            </p>
          </div>
        )}
        
        <Button type="submit" disabled={isSubmitting}>
          <UserPlus className="mr-2 h-4 w-4" /> 
          {isSubmitting ? "Enviando invitación..." : "Añadir Usuario"}
        </Button>
      </form>
    </Form>
  );
};
