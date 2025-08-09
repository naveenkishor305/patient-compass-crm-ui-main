// Update this page (the content is just a fallback if you fail to update the page)

import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Users, FileText, CheckSquare, Calendar, MessageSquare, Mail, DollarSign, UserCheck, Pill, BarChart3, PieChart, Settings, Shield, UserCog, Building, Stethoscope, ClipboardList, Gavel, Bell } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const { currentUser, switchUser } = useUser();

  const roleOptions = [
    { userKey: "admin", name: "Admin User", description: "System Administrator", icon: Settings },
    { userKey: "crm", name: "Dr. Jane Smith", description: "Patient Support Rep", icon: Users },
    { userKey: "doctor", name: "Dr. Michael Chen", description: "Cardiologist", icon: Stethoscope },
    { userKey: "marketing", name: "Sarah Williams", description: "Marketing Specialist", icon: BarChart3 },
    { userKey: "frontdesk", name: "Front Desk User", description: "Front Desk Receptionist", icon: UserCheck },
  ];

  const quickActions = [
    { name: "Dashboard", href: "/dashboard", icon: Activity, description: "Main dashboard" },
    { name: "Patients", href: "/patients", icon: Users, description: "Patient management" },
    { name: "Cases", href: "/cases", icon: FileText, description: "Case management" },
    { name: "Tasks", href: "/tasks", icon: CheckSquare, description: "Task management" },
    { name: "Schedule", href: "/schedule", icon: Calendar, description: "Schedule management" },
    { name: "Messages", href: "/messages", icon: MessageSquare, description: "Internal messaging" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center">
              <Activity className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              HealthCare CRM
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive patient care and case management system for healthcare professionals
          </p>
        </div>

        {/* User Selection */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCog className="h-5 w-5" />
              Switch User Role
            </CardTitle>
            <CardDescription>
              Select a different user role to test different permissions and views
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {roleOptions.map((role) => {
                const Icon = role.icon;
                const isActive =
                  (role.userKey === "admin" && currentUser.role === "admin") ||
                  (role.userKey === "crm" && currentUser.role === "crm_user") ||
                  (role.userKey === "doctor" && currentUser.role === "doctor") ||
                  (role.userKey === "marketing" && currentUser.role === "marketing") ||
                  (role.userKey === "frontdesk" && currentUser.role === "front_desk");
                return (
                  <Button
                    key={role.userKey}
                    variant={isActive ? "default" : "outline"}
                    className="h-auto p-4 flex flex-col items-center gap-2"
                    onClick={() => switchUser(role.userKey)}
                  >
                    <Icon className="h-6 w-6" />
                    <div className="text-center">
                      <div className="font-medium">{role.name}</div>
                      <div className="text-xs opacity-80">{role.description}</div>
                    </div>
                    {isActive && <Badge variant="secondary" className="text-xs">Current</Badge>}
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Current User Info */}
        <Card className="max-w-4xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Current User
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{currentUser.name}</h3>
                <p className="text-muted-foreground">{currentUser.email}</p>
                <p className="text-sm text-muted-foreground">{currentUser.position}</p>
              </div>
              <Badge variant="outline" className="text-sm">
                {currentUser.role.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Access main application features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.name} to={action.href}>
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Icon className="h-6 w-6 text-primary" />
                          <div>
                            <h4 className="font-medium">{action.name}</h4>
                            <p className="text-sm text-muted-foreground">{action.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
