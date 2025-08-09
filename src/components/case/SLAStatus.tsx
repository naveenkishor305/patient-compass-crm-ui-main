
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

interface SLAStatusProps {
  sla: {
    status: string;
    target: string;
    timeRemaining: string;
    progress: number;
  };
}

export const SLAStatusCard = ({ sla }: SLAStatusProps) => {
  const getSLAIndicator = () => {
    switch (sla.status) {
      case "on-track":
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-healthcare-success/10 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-healthcare-success" />
              </div>
              <span className="text-healthcare-success font-medium bg-healthcare-success/10 px-3 py-1 rounded-full">
                On Track
              </span>
              <span className="text-sm text-muted-foreground ml-auto">
                {sla.timeRemaining}
              </span>
            </div>
            <Progress
              value={sla.progress}
              className="h-2 bg-gray-100"
              indicatorClassName="bg-gradient-to-r from-healthcare-success/60 to-healthcare-success"
            />
          </div>
        );
      case "at-risk":
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-healthcare-warning/10 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-healthcare-warning" />
              </div>
              <span className="text-healthcare-warning font-medium bg-healthcare-warning/10 px-3 py-1 rounded-full">
                At Risk
              </span>
              <span className="text-sm text-muted-foreground ml-auto">
                {sla.timeRemaining}
              </span>
            </div>
            <Progress
              value={sla.progress}
              className="h-2 bg-gray-100"
              indicatorClassName="bg-gradient-to-r from-healthcare-warning/60 to-healthcare-warning"
            />
          </div>
        );
      case "breached":
        return (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-healthcare-danger/10 flex items-center justify-center animate-pulse">
                <AlertTriangle className="h-5 w-5 text-healthcare-danger" />
              </div>
              <span className="text-healthcare-danger font-medium bg-healthcare-danger/10 px-3 py-1 rounded-full">
                SLA Breached
              </span>
            </div>
            <Progress
              value={100}
              className="h-2 bg-gray-100"
              indicatorClassName="bg-gradient-to-r from-healthcare-danger/60 to-healthcare-danger"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="enhanced-card relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-primary"></div>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold">SLA Status</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {getSLAIndicator()}
        <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Target: {sla.target}</span>
        </div>
      </CardContent>
    </Card>
  );
};
