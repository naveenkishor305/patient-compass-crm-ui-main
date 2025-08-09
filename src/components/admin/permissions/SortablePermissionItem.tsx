
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip } from "lucide-react";

export interface Permission {
  id: string;
  name: string;
}

interface SortablePermissionItemProps {
  permission: Permission;
}

export const SortablePermissionItem = ({ permission }: SortablePermissionItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: permission.id,
    data: {
      permission
    }
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 mb-2 bg-white dark:bg-gray-800 rounded-lg border shadow-sm cursor-move hover:shadow-md transition-all duration-200 flex items-center justify-between group"
    >
      <div className="flex items-center gap-3">
        <Grip className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="font-medium">{permission.name}</span>
      </div>
    </div>
  );
};
