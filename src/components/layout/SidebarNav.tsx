import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useUser } from "@/contexts/UserContext";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  FileText,
  CheckSquare,
  Calendar,
  MessageSquare,
  Mail,
  Activity,
  DollarSign,
  UserCheck,
  Pill,
  BarChart3,
  PieChart,
  Settings,
  Shield,
  UserCog,
  Building,
  Stethoscope,
  ClipboardList,
  Gavel,
  Bell,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: any;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

export const SidebarNav = () => {
  const { currentUser } = useUser();
  const location = useLocation();
  
  const isAdmin = currentUser?.role === "admin";
  
  const navigationItems = [
    {
      title: "Core Modules",
      items: [
        { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
        { name: "Patients", href: "/patients", icon: Users },
        { name: "Cases", href: "/cases", icon: FileText },
        { name: "Tasks", href: "/tasks", icon: CheckSquare },
        { name: "Schedule", href: "/schedule", icon: Calendar },
        { name: "Messages", href: "/messages", icon: MessageSquare },
        { name: "Email", href: "/email", icon: Mail },
      ],
    },
    {
      title: "EHR & Clinical",
      items: [
        { name: "Pharmacy", href: "/pharmacy", icon: Pill },
      ],
    },
    {
      title: "Business Operations",
      items: [
        { name: "Billing", href: "/billing", icon: DollarSign },
        { name: "HRM", href: "/hrm", icon: UserCheck },
      ],
    },
    {
      title: "Analytics & Reporting",
      items: [
        { name: "Reporting", href: "/reporting", icon: BarChart3 },
        { name: "Power BI", href: "/powerbi", icon: PieChart },
      ],
    },
  ] as NavSection[];

  const adminNavigationItems = [
    {
      title: "Admin Tools",
      items: [
        { name: "User Management", href: "/admin/users", icon: UserCog },
        { name: "Team Management", href: "/admin/teams", icon: Building },
        { name: "Doctor Management", href: "/admin/doctors", icon: Stethoscope },
        { name: "Role Permissions", href: "/admin/permissions", icon: Shield },
      ],
    },
    {
      title: "Configuration",
      items: [
        { name: "Case Config", href: "/admin/case-config", icon: ClipboardList },
        { name: "SLA Rules", href: "/admin/sla-rules", icon: Gavel },
        { name: "Notifications", href: "/admin/notifications", icon: Bell },
        { name: "System Settings", href: "/admin/settings", icon: Settings },
      ],
    },
  ] as NavSection[];

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
            <Activity className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg">HealthCare CRM</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2">
        {navigationItems.map((section, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel
              colorClass="text-white"
              className="text-xs font-semibold uppercase tracking-wider px-2 py-2"
            >
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item, itemIndex) => (
                  <SidebarMenuItem key={itemIndex}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors w-full",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                          )
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        {item.name}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {isAdmin && (
          <SidebarGroup>
            <Collapsible className="w-full">
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel
                  colorClass="text-white"
                  className="flex items-center justify-between w-full rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider">Admin Panel</span>
                  <ChevronDown className="h-4 w-4" />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent className="pl-2">
                  {adminNavigationItems.map((section, index) => (
                    <SidebarGroup key={index}>
                      <SidebarGroupLabel
                        colorClass="text-white"
                        className="text-xs font-medium px-2 py-1"
                      >
                        {section.title}
                      </SidebarGroupLabel>
                      <SidebarMenu>
                        {section.items.map((item, itemIndex) => (
                          <SidebarMenuItem key={itemIndex}>
                            <SidebarMenuButton asChild>
                              <NavLink
                                to={item.href}
                                className={({ isActive }) =>
                                  cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors w-full",
                                    isActive
                                      ? "bg-primary text-primary-foreground"
                                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                  )
                                }
                              >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                              </NavLink>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroup>
                  ))}
                </SidebarGroupContent>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
};
