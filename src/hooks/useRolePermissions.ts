
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { roleDescriptions } from "@/docs/RoleDescriptions";
import { UserRole } from "@/types/user";
import { Permission } from "@/components/admin/permissions/SortablePermissionItem";

export const useRolePermissions = (selectedRole: UserRole) => {
  const [availablePermissions, setAvailablePermissions] = useState<Permission[]>([]);
  const [assignedPermissions, setAssignedPermissions] = useState<Permission[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize permissions based on role descriptions
  useEffect(() => {
    if (selectedRole) {
      // Set assigned permissions from roleDescriptions
      const currentRolePermissions = roleDescriptions[selectedRole].permissions.map(
        (name, index) => ({
          id: `assigned-${selectedRole}-${index}`,
          name,
        })
      );
      
      setAssignedPermissions(currentRolePermissions);
      
      // Create a set of all possible permissions from all roles
      const allPermissionsSet = new Set<string>();
      Object.values(roleDescriptions).forEach(role => {
        role.permissions.forEach(perm => allPermissionsSet.add(perm));
      });
      
      // Remove already assigned permissions
      const assignedPermissionNames = new Set(currentRolePermissions.map(p => p.name));
      const remainingPermissions = Array.from(allPermissionsSet)
        .filter(name => !assignedPermissionNames.has(name))
        .map((name, index) => ({
          id: `available-${index}`,
          name,
        }));
        
      setAvailablePermissions(remainingPermissions);
    }
  }, [selectedRole]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const activeItem = [...availablePermissions, ...assignedPermissions].find(
      item => item.id === active.id
    );
    
    if (!activeItem) return;

    // Check if the permission is being moved from available to assigned
    if (availablePermissions.find(item => item.id === active.id) && 
        over.id === "assigned-permissions-container") {
      // Move from available to assigned
      setAvailablePermissions(availablePermissions.filter(item => item.id !== active.id));
      setAssignedPermissions([...assignedPermissions, activeItem]);
      toast.success(`Added "${activeItem.name}" to ${roleDescriptions[selectedRole].title} role`);
    }
    // Check if the permission is being moved from assigned to available
    else if (assignedPermissions.find(item => item.id === active.id) && 
             over.id === "available-permissions-container") {
      // Move from assigned to available
      setAssignedPermissions(assignedPermissions.filter(item => item.id !== active.id));
      setAvailablePermissions([...availablePermissions, activeItem]);
      toast.success(`Removed "${activeItem.name}" from ${roleDescriptions[selectedRole].title} role`);
    }
    // Reordering within the assigned permissions
    else if (assignedPermissions.find(item => item.id === active.id) && 
             assignedPermissions.find(item => item.id === over.id)) {
      const oldIndex = assignedPermissions.findIndex(item => item.id === active.id);
      const newIndex = assignedPermissions.findIndex(item => item.id === over.id);
      
      // Use array move to reorder
      const reorderedPermissions = [...assignedPermissions];
      const [removed] = reorderedPermissions.splice(oldIndex, 1);
      reorderedPermissions.splice(newIndex, 0, removed);
      
      setAssignedPermissions(reorderedPermissions);
    }
  };

  const filteredAvailablePermissions = availablePermissions.filter(
    permission => permission.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const saveChanges = () => {
    // In a real application, this would save to backend/database
    toast.success("Permission changes saved successfully");
  };

  return {
    availablePermissions,
    assignedPermissions,
    filteredAvailablePermissions,
    searchTerm,
    setSearchTerm,
    handleDragEnd,
    saveChanges
  };
};
