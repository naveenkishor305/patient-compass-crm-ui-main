
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TaskListProps {
  title: string;
  description?: string;
  tasks: {
    id: string;
    title: string;
    priority: "high" | "medium" | "low";
    patient: {
      id: string;
      name: string;
    };
    dueDate: string;
    completed: boolean;
    assignee?: {
      id: string;
      name: string;
      avatar?: string;
    };
  }[];
  onTaskComplete?: (taskId: string, completed: boolean) => void;
  showAssignee?: boolean;
}

export function TaskList({
  title,
  description,
  tasks,
  onTaskComplete,
  showAssignee = false,
}: TaskListProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-amber-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
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
          {tasks.length === 0 ? (
            <div className="px-6 py-3 text-center text-muted-foreground">
              No tasks found
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "flex items-start justify-between px-6 py-4 hover:bg-muted/50",
                  task.completed && "opacity-60"
                )}
              >
                <div className="flex items-start space-x-4">
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={(checked) => onTaskComplete?.(task.id, checked === true)}
                    className="mt-1"
                  />
                  <div className="space-y-1">
                    <label
                      htmlFor={`task-${task.id}`}
                      className={cn(
                        "font-medium",
                        task.completed && "line-through text-muted-foreground"
                      )}
                    >
                      {task.title}
                    </label>
                    <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-2">
                      <Badge
                        className={cn(
                          "rounded-md capitalize",
                          getPriorityColor(task.priority)
                        )}
                      >
                        {task.priority}
                      </Badge>
                      <span>{task.dueDate}</span>
                      <span>•</span>
                      <span>{task.patient.name}</span>
                      {showAssignee && task.assignee && (
                        <>
                          <span>•</span>
                          <div className="flex items-center">
                            <span>Assigned to:</span>
                            <Avatar className="h-5 w-5 ml-1">
                              <AvatarImage src={task.assignee.avatar} />
                              <AvatarFallback className="text-[10px]">
                                {task.assignee.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
