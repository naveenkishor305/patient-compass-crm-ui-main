
import { useUser } from "@/contexts/UserContext";
import { UserRole } from "@/types/user";
import { ReactNode } from "react";

interface RoleGuardProps {
  allowedRoles: UserRole | UserRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function RoleGuard({ allowedRoles, children, fallback = null }: RoleGuardProps) {
  const { hasPermission } = useUser();
  
  if (hasPermission(allowedRoles)) {
    return <>{children}</>;
  }
  
  return <>{fallback}</>;
}
