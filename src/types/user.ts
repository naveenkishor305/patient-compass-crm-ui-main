export type UserRole = "admin" | "crm_user" | "doctor" | "marketing" | "front_desk";

export interface Permission {
  id: string;
  name: string;
  description?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  position: string;
  avatar?: string;
  permissions?: string[]; // For custom permission sets beyond role defaults
}
