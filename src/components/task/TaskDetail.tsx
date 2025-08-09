
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Eye, FileText, PencilIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TaskDetailProps {
  task: {
    id: string;
    title: string;
    description?: string;
    priority: "high" | "medium" | "low";
    status: "open" | "in-progress" | "completed";
    dueDate: string;
    patient?: {
      id: string;
      name: string;
    };
    case?: {
      id: string;
      caseId: string;
    };
    assignee: {
      id: string;
      name: string;
    };
  };
}

export function TaskDetail({ task }: TaskDetailProps) {
  const navigate = useNavigate();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-healthcare-danger text-white";
      case "medium":
        return "bg-healthcare-warning text-black";
      case "low":
        return "bg-healthcare-primary text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-500 text-white";
      case "in-progress":
        return "bg-indigo-500 text-white";
      case "completed":
        return "bg-green-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">{task.title}</CardTitle>
        <Button
          variant="outline"
          onClick={() => navigate(`/tasks/${task.id}/edit`)}
        >
          <PencilIcon className="h-4 w-4 mr-2" />
          Edit Task
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-2">
          <Badge className={cn("rounded-md", getPriorityColor(task.priority))}>
            {task.priority}
          </Badge>
          <Badge className={cn("rounded-md", getStatusColor(task.status))}>
            {task.status.replace("-", " ")}
          </Badge>
        </div>

        {task.description && (
          <div className="space-y-2">
            <h3 className="font-semibold">Description</h3>
            <p className="text-muted-foreground">{task.description}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Due Date</h3>
            <p className="text-muted-foreground">{task.dueDate}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Assignee</h3>
            <p className="text-muted-foreground">{task.assignee.name}</p>
          </div>

          {task.patient && (
            <div className="space-y-2">
              <h3 className="font-semibold">Patient</h3>
              <p className="text-muted-foreground">{task.patient.name}</p>
            </div>
          )}

          {task.case && (
            <div className="space-y-2">
              <h3 className="font-semibold">Case</h3>
              <p className="text-muted-foreground">#{task.case.caseId}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
