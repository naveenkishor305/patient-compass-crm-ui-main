
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TaskList } from "@/components/dashboard/TaskList";
import { PlusCircle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
  patient: { id: string; name: string };
  dueDate: string;
  completed: boolean;
}

interface TasksTabProps {
  tasks: Task[];
}

export const TasksTab = ({ tasks }: TasksTabProps) => {
  return (
    <Card className="mt-4 shadow-card hover:shadow-card-hover transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-xl font-semibold">Case Tasks</CardTitle>
          <CardDescription className="text-muted-foreground">
            Tasks associated with this case
          </CardDescription>
        </div>
        <Button className="bg-healthcare-primary hover:bg-healthcare-dark">
          <PlusCircle className="h-4 w-4 mr-2" />
          Create Task
        </Button>
      </CardHeader>
      <CardContent className="pt-0">
        <TaskList
          title=""
          tasks={tasks}
          onTaskComplete={() => {}}
        />
      </CardContent>
    </Card>
  );
};
