import { createContext, useContext, useState, ReactNode } from "react";
import { User, UserRole } from "@/types/user";

// Sample user data
const mockUsers: Record<string, User> = {
  "admin": {
    id: "admin-1",
    name: "Admin User",
    email: "admin@hospital.com",
    role: "admin",
    position: "System Administrator",
  },
  "crm": {
    id: "crm-1",
    name: "Dr. Jane Smith",
    email: "jane.smith@hospital.com",
    role: "crm_user",
    position: "Patient Support Rep",
  },
  "doctor": {
    id: "doctor-1",
    name: "Dr. Michael Chen",
    email: "m.chen@hospital.com",
    role: "doctor",
    position: "Cardiologist",
  },
  "marketing": {
    id: "marketing-1",
    name: "Sarah Williams",
    email: "s.williams@hospital.com",
    role: "marketing",
    position: "Marketing Specialist",
  },
  "frontdesk": {
    id: "frontdesk-1",
    name: "Front Desk User",
    email: "frontdesk@hospital.com",
    role: "front_desk",
    position: "Front Desk Receptionist",
  },
};

interface UserContextType {
  currentUser: User;
  switchUser: (userId: string) => void;
  hasPermission: (requiredRoles: UserRole | UserRole[]) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(mockUsers.crm);

  const switchUser = (userId: string) => {
    if (mockUsers[userId]) {
      setCurrentUser(mockUsers[userId]);
    }
  };

  const hasPermission = (requiredRoles: UserRole | UserRole[]) => {
    if (Array.isArray(requiredRoles)) {
      return requiredRoles.includes(currentUser.role);
    }
    return currentUser.role === requiredRoles || currentUser.role === "admin";
  };

  return (
    <UserContext.Provider value={{ currentUser, switchUser, hasPermission }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
