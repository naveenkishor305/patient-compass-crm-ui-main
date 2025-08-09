
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardList, Clock, CheckCircle, AlertCircle } from "lucide-react";

export const FeedbackProtocols = () => {
  const protocols = [
    {
      id: "p1",
      title: "Post-Surgery Follow-up",
      patient: "Sarah Johnson",
      dueDate: "Today",
      status: "overdue",
      priority: "high"
    },
    {
      id: "p2",
      title: "Medication Review",
      patient: "Michael Chen",
      dueDate: "Tomorrow",
      status: "pending",
      priority: "medium"
    },
    {
      id: "p3",
      title: "Care Plan Update",
      patient: "Emma Davis",
      dueDate: "2 days",
      status: "completed",
      priority: "low"
    },
    {
      id: "p4",
      title: "Treatment Response",
      patient: "Robert Wilson",
      dueDate: "3 days",
      status: "pending",
      priority: "medium"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "overdue": return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "pending": return <Clock className="h-4 w-4 text-amber-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "overdue": return "bg-red-100 text-red-800";
      case "pending": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-purple-600" />
          Feedback Protocols
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-1">
          {protocols.map((protocol) => (
            <div key={protocol.id} className="px-6 py-3 hover:bg-muted/50">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(protocol.status)}
                    <span className="font-medium text-sm">{protocol.title}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{protocol.patient}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Due: {protocol.dueDate}</span>
                    <Badge className={`text-xs ${getStatusColor(protocol.status)}`}>
                      {protocol.status}
                    </Badge>
                    <Badge className={`text-xs ${getPriorityColor(protocol.priority)}`}>
                      {protocol.priority}
                    </Badge>
                  </div>
                </div>
                {protocol.status !== "completed" && (
                  <Button variant="outline" size="sm" className="text-xs">
                    Complete
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
