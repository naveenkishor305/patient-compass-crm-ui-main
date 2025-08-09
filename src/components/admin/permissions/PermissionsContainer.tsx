
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Shield, Plus, Minus } from "lucide-react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Input } from "@/components/ui/input";
import { SortablePermissionItem, Permission } from "./SortablePermissionItem";

interface PermissionsContainerProps {
  type: "assigned" | "available";
  title: string;
  permissions: Permission[];
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

export const PermissionsContainer = ({ 
  type, 
  title, 
  permissions, 
  searchTerm, 
  onSearchChange 
}: PermissionsContainerProps) => {
  const isAssigned = type === "assigned";
  const containerId = `${type}-permissions-container`;

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isAssigned ? (
            <Shield className="w-5 h-5 text-primary" />
          ) : (
            <Plus className="w-5 h-5 text-primary" />
          )}
          {title}
        </CardTitle>
        {!isAssigned && (
          <div className="relative mt-2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search permissions..."
              className="pl-8"
              value={searchTerm || ""}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            />
          </div>
        )}
        {isAssigned && (
          <p className="text-sm text-muted-foreground">
            Drag to reorder or remove permissions
          </p>
        )}
      </CardHeader>
      <CardContent 
        id={containerId}
        className="min-h-[400px] border-2 border-dashed rounded-lg p-4 transition-colors hover:border-primary/50"
      >
        <SortableContext 
          items={permissions.map(p => p.id)} 
          strategy={verticalListSortingStrategy}
        >
          {permissions.map(permission => (
            <SortablePermissionItem 
              key={permission.id} 
              permission={permission} 
            />
          ))}
        </SortableContext>
        {permissions.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-2">
            {isAssigned ? (
              <>
                <Minus className="w-8 h-8" />
                <p>No permissions assigned</p>
              </>
            ) : (
              <>
                <Search className="w-8 h-8" />
                <p>{searchTerm ? "No matching permissions" : "No additional permissions available"}</p>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
