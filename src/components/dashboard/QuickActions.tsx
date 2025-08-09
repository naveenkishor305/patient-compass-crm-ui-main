
import { UserIcon, PhoneCall, Clock } from "lucide-react";
import { QuickActionButton } from "./QuickActionButton";

export const QuickActions = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
      <QuickActionButton 
        icon={UserIcon} 
        label="Change Status" 
      />
      <QuickActionButton 
        icon={PhoneCall} 
        label="Initiate Call" 
      />
      <QuickActionButton 
        icon={Clock} 
        label="Log Interaction" 
      />
    </div>
  );
};
