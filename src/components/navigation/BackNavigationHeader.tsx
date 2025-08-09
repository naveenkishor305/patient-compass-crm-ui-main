
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BackNavigationHeaderProps {
  title: string;
  className?: string;
}

export function BackNavigationHeader({ title, className }: BackNavigationHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const goBack = () => {
    navigate(-1);
  };
  
  return (
    <div className={cn("flex items-center gap-4 mb-6", className)}>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={goBack} 
        className="rounded-full hover:bg-muted"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="sr-only">Back</span>
      </Button>
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-sm text-muted-foreground">{location.pathname}</p>
      </div>
    </div>
  );
}
