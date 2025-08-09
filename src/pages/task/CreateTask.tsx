
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskForm } from "@/components/task/TaskForm";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { toFHIRTask } from "@/lib/fhir/types";

export default function CreateTask() {
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    // Convert to FHIR Task resource
    const fhirTask = toFHIRTask({
      ...data,
      id: `t${Math.floor(Math.random() * 10000)}`, // Generate a random ID
      createdAt: new Date().toISOString(),
      patientName: data.patientId === "p1" ? "Sarah Johnson" : 
                   data.patientId === "p2" ? "Michael Williams" : 
                   data.patientId === "p3" ? "David Brown" : "",
      assigneeName: data.assigneeId === "u1" ? "Dr. Jane Smith" : 
                    data.assigneeId === "u2" ? "Dr. Robert Chen" : 
                    data.assigneeId === "u3" ? "Nurse Wilson" : ""
    });

    console.log("Creating FHIR task:", fhirTask);
    // In a real app, you would make an API call here to create the FHIR resource
    toast("Task created successfully");
    navigate("/tasks");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  );
}
