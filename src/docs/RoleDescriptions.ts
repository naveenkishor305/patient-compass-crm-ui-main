
import { UserRole } from "@/types/user";

interface RoleDescription {
  title: string;
  description: string;
  permissions: string[];
}

export const roleDescriptions: Record<UserRole, RoleDescription> = {
  crm_user: {
    title: "CRM User",
    description: "Manages patient relationships, tracks interactions, resolves cases, and handles related tasks within the CRM.",
    permissions: [
      "View personalized User Dashboard",
      "Perform Advanced Patient Search",
      "View and edit Patient Profiles",
      "Manage cases (create, update, view)",
      "Manage tasks (create, update, view)",
      "View patient feedback history",
      "Access relevant CRM reports"
    ]
  },
  doctor: {
    title: "Doctor",
    description: "Access patient information within the CRM for context related to interactions or feedback.",
    permissions: [
      "View Patient Profiles (including synced HIS data)",
      "View interaction history",
      "View patient feedback linked to them"
    ]
  },
  marketing: {
    title: "Marketing User",
    description: "Analyze marketing-related data and patient engagement metrics.",
    permissions: [
      "Access Power BI Marketing Reporting Dashboard",
      "View patient segments for analysis",
      "Access marketing-related reports"
    ]
  },
  admin: {
    title: "System Administrator",
    description: "Configures, manages, maintains, and monitors both the Contact Center and CRM systems.",
    permissions: [
      "Manage users and roles",
      "Configure system settings",
      "Manage notification templates",
      "Manage task templates",
      "Configure case settings",
      "Define SLA rules",
      "Manage escalation rules",
      "Manage doctor profiles",
      "Manage emergency response teams",
      "Access all reporting capabilities",
      "Configure integration parameters"
    ]
  }
};
