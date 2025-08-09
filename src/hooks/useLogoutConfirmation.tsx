
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export function useLogoutConfirmation() {
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const showLogoutConfirmation = () => {
    setIsLogoutDialogOpen(true);
  };
  
  const confirmLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the system.",
    });
    
    // In a real app, this would call an API to logout
    // Then redirect to login page
    // navigate('/login');
    
    setIsLogoutDialogOpen(false);
  };
  
  const LogoutConfirmationDialog = () => (
    <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to log out? Any unsaved changes will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmLogout}>Logout</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  
  return { showLogoutConfirmation, LogoutConfirmationDialog };
}
