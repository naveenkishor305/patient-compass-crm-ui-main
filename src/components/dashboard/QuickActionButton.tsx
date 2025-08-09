
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface QuickActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export const QuickActionButton = ({ icon: Icon, label, onClick }: QuickActionButtonProps) => {
  return (
    <Card 
      className="hover:bg-muted/50 cursor-pointer transition-colors" 
      onClick={onClick}
    >
      <CardContent className="flex items-center justify-center p-6">
        <div className="text-center">
          <div className="mb-2 p-2 bg-primary/10 rounded-full w-10 h-10 flex items-center justify-center mx-auto">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-medium text-sm">{label}</h3>
        </div>
      </CardContent>
    </Card>
  );
};
