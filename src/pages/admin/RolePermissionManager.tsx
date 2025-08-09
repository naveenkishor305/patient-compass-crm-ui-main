
import React, { useState } from "react";
import { BackNavigationHeader } from "@/components/navigation/BackNavigationHeader";
import { Button } from "@/components/ui/button";
import { Shield, Users, Save } from "lucide-react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoleGuard } from "@/components/auth/RoleGuard";
import { roleDescriptions } from "@/docs/RoleDescriptions";
import { UserRole } from "@/types/user";
import { PermissionsContainer } from "@/components/admin/permissions/PermissionsContainer";
import { useRolePermissions } from "@/hooks/useRolePermissions";

export default function RolePermissionManager() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("crm_user");
  
  const { 
    filteredAvailablePermissions, 
    assignedPermissions, 
    searchTerm, 
    setSearchTerm, 
    handleDragEnd, 
    saveChanges 
  } = useRolePermissions(selectedRole);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <RoleGuard allowedRoles="admin" fallback={<div>You do not have permission to access this page.</div>}>
      <div className="p-6 max-w-7xl mx-auto">
        <BackNavigationHeader title="Role Permission Manager" />
        <div className="flex justify-between items-center mt-6">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold">Role Permission Manager</h1>
            </div>
            <p className="text-muted-foreground mt-2">
              Configure permissions for different user roles
            </p>
          </div>
          <Button onClick={saveChanges} size="lg" className="gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="crm_user" onValueChange={(value) => setSelectedRole(value as UserRole)} className="w-full">
            <TabsList className="w-full border-b mb-6 bg-background">
              {Object.entries(roleDescriptions).map(([role, description]) => (
                <TabsTrigger key={role} value={role} className="flex-1 gap-2 py-3">
                  <Users className="w-4 h-4" />
                  {description.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {Object.entries(roleDescriptions).map(([role, description]) => (
              <TabsContent key={role} value={role} className="mt-0">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold">{description.title}</h2>
                  <p className="text-muted-foreground">{description.description}</p>
                </div>
                
                <DndContext 
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Assigned Permissions */}
                    <PermissionsContainer
                      type="assigned"
                      title="Assigned Permissions"
                      permissions={assignedPermissions}
                    />

                    {/* Available Permissions */}
                    <PermissionsContainer
                      type="available"
                      title="Available Permissions"
                      permissions={filteredAvailablePermissions}
                      searchTerm={searchTerm}
                      onSearchChange={setSearchTerm}
                    />
                  </div>
                </DndContext>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </RoleGuard>
  );
}
