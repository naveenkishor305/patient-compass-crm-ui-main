
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Case {
  id: string;
  caseId: string;
  subject: string;
  status: "open" | "in-progress" | "pending" | "resolved" | "closed";
  patient: {
    id: string;
    name: string;
  };
  priority: "high" | "medium" | "low";
  createdDate: string;
  sla?: {
    status: "on-track" | "at-risk" | "breached";
    timeRemaining?: string;
  };
}

interface CaseListProps {
  title: string;
  description?: string;
  cases: Case[];
  onViewCase?: (caseId: string) => void;
}

export function CaseList({
  title,
  description,
  cases,
  onViewCase,
}: CaseListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-500 text-white";
      case "in-progress":
        return "bg-indigo-500 text-white";
      case "pending":
        return "bg-amber-500 text-white";
      case "resolved":
        return "bg-green-500 text-white";
      case "closed":
        return "bg-gray-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getSLAIndicator = (sla?: Case["sla"]) => {
    if (!sla) return null;

    switch (sla.status) {
      case "on-track":
        return (
          <div className="flex items-center text-xs text-healthcare-success">
            <Clock className="h-3 w-3 mr-1" />
            {sla.timeRemaining}
          </div>
        );
      case "at-risk":
        return (
          <div className="flex items-center text-xs text-healthcare-warning">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {sla.timeRemaining}
          </div>
        );
      case "breached":
        return (
          <div className="flex items-center text-xs text-healthcare-danger">
            <AlertTriangle className="h-3 w-3 mr-1" />
            SLA Breached
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-1">
          {cases.length === 0 ? (
            <div className="px-6 py-3 text-center text-muted-foreground">
              No cases found
            </div>
          ) : (
            cases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="flex items-start justify-between px-6 py-4 hover:bg-muted/50"
              >
                <div className="space-y-1">
                  <div className="flex items-center">
                    <div className="font-medium">{caseItem.subject}</div>
                    <Badge
                      className={cn(
                        "ml-2 rounded-md capitalize",
                        getStatusColor(caseItem.status)
                      )}
                    >
                      {caseItem.status.replace("-", " ")}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span>
                      Case #{caseItem.caseId} • {caseItem.patient.name} • Created {caseItem.createdDate}
                    </span>
                  </div>
                  {caseItem.sla && (
                    <div className="mt-1">{getSLAIndicator(caseItem.sla)}</div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewCase?.(caseItem.id)}
                >
                  View
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
