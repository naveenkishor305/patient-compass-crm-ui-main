
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  className 
}: StatsCardProps) {
  return (
    <Card className={cn("enhanced-card group", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary opacity-70"></div>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gradient-soft group-hover:bg-gradient-primary transition-all duration-300">
          <Icon className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">{value}</div>
        {(description || trend) && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            {trend && (
              <span className={cn(
                "mr-1",
                trend.isPositive ? "text-healthcare-success" : "text-healthcare-danger"
              )}>
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
            )}
            {description}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
