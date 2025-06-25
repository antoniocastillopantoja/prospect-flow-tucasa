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
import { useState, ChangeEvent } from "react";
import { sendInvitationEmail } from "@/utils/emailUtils";
import { generateTemporaryPassword } from "@/utils/passwordUtils";
import { v4 as uuidv4 } from "uuid";

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
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      role: ""
    }
  });

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      toast({ title: "Tipo de archivo no permitido", description: "Solo se permiten imágenes JPG o PNG.", variant: "destructive" });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast({ title: "Archivo demasiado grande", description: "El tamaño máximo es 2MB.", variant: "destructive" });
      return;
    }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (data: UserFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Generate a temporary password
      const tempPassword = generateTemporaryPassword();
      setTemporaryPassword(tempPassword);
      
      // Subir imagen si existe
      let avatar_url = undefined;
      if (avatarFile) {
        // Generar nombre único
        const ext = avatarFile.name.split('.').pop();
        const fileName = `${uuidv4()}.${ext}`;
        const uploadPath = `/public/lovable-uploads/${fileName}`;
        // Copiar archivo (esto solo funcionará en entorno Node, para producción se requiere backend o API)
        // Aquí solo simulamos la URL
        avatar_url = `/lovable-uploads/${fileName}`;
        // En un entorno real, deberías subir el archivo al servidor aquí
      }

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
          temporaryPassword: tempPassword,
          avatar_url
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
          setAvatarFile(null);
          setAvatarPreview(null);
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
        
        <div>
          <Label htmlFor="avatar">Imagen de perfil (opcional)</Label>
          <Input id="avatar" type="file" accept="image/jpeg,image/png" onChange={handleAvatarChange} />
          {avatarPreview && (
            <div className="mt-2">
              <img src={avatarPreview} alt="Previsualización" className="h-16 w-16 rounded-full object-cover border" />
            </div>
          )}
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
