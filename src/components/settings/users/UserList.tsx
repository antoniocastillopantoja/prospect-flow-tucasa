
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types/settings";
import { UserListHeader } from "./UserListHeader";
import { UserListTable } from "./UserListTable";
import { ConfirmToggleDialog } from "./ConfirmToggleDialog";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";
import { EditUserDialog, UserEditValues } from "../EditUserDialog";

interface UserListProps {
  users: User[];
  onToggleStatus: (userId: string) => void;
  onEditUser: (userId: string, userData: UserEditValues) => void;
  onDeleteUser: (userId: string) => void;
  checkUserCanBeDeleted: (userId: string) => boolean;
}

export const UserList = ({ 
  users, 
  onToggleStatus, 
  onEditUser, 
  onDeleteUser,
  checkUserCanBeDeleted 
}: UserListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  // State for the edit dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // State for confirmation dialog
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [userToToggle, setUserToToggle] = useState<User | null>(null);
  
  // State for delete confirmation dialog
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [canDeleteUser, setCanDeleteUser] = useState(false);
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    );
  });

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleToggleStatusClick = (user: User) => {
    setUserToToggle(user);
    setConfirmDialogOpen(true);
  };

  const confirmToggleStatus = () => {
    if (userToToggle) {
      onToggleStatus(userToToggle.id);
      setConfirmDialogOpen(false);
      setUserToToggle(null);
    }
  };
  
  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    const canDelete = checkUserCanBeDeleted(user.id);
    setCanDeleteUser(canDelete);
    setConfirmDeleteDialogOpen(true);
  };
  
  const confirmDeleteUser = () => {
    if (userToDelete && canDeleteUser) {
      onDeleteUser(userToDelete.id);
      setConfirmDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };
  
  return (
    <div className="space-y-4">
      <UserListHeader 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filteredUsers={filteredUsers}
      />
      
      <UserListTable 
        filteredUsers={filteredUsers}
        onEditClick={handleEditClick}
        onToggleStatusClick={handleToggleStatusClick}
        onDeleteClick={handleDeleteClick}
      />
      
      {/* Edit User Dialog */}
      <EditUserDialog 
        user={selectedUser}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onUpdateUser={onEditUser}
      />
      
      {/* Confirmation Dialog */}
      <ConfirmToggleDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        user={userToToggle}
        onConfirm={confirmToggleStatus}
      />
      
      {/* Delete Confirmation Dialog */}
      <ConfirmDeleteDialog
        open={confirmDeleteDialogOpen}
        onOpenChange={setConfirmDeleteDialogOpen}
        user={userToDelete}
        onConfirm={confirmDeleteUser}
        canDelete={canDeleteUser}
      />
    </div>
  );
};
