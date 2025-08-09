
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskForm } from "@/components/task/TaskForm";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { toFHIRTask, fromFHIRTask, FHIRTask } from "@/lib/fhir/types";

export default function EditTask() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock FHIR task data - in a real app, you would fetch this from a FHIR API
  const mockFhirTask: FHIRTask = {
    resourceType: "Task",
    id: "t1",
    status: "in-progress",
    intent: "order",
    priority: "urgent",
    description: "Follow up with patient Sarah Johnson about medication",
    focus: {
      reference: "Case/c1",
      display: "CSE-1234"
    },
    for: {
      reference: "Patient/p1",
      display: "Sarah Johnson"
    },
    authoredOn: "2025-04-01T14:00:00Z",
    executionPeriod: {
      end: "2025-04-25T14:00:00Z"
    },
    owner: {
      reference: "Practitioner/u1",
      display: "Dr. Jane Smith"
    }
  };

  // Convert FHIR task to app format
  const task = {
    id: "t1",
    title: "Follow up with patient Sarah Johnson about medication",
    description: "Call to check on side effects and compliance",
    priority: "high" as const,
    status: "open" as const, 
    dueDate: new Date("2025-04-25T14:00:00"),
    patientId: "p1",
    caseId: "c1",
    assigneeId: "u1",
  };

  const handleSubmit = (data: any) => {
    // Convert to FHIR Task resource for API submission
    const fhirTask = toFHIRTask({
      ...data,
      id: id,
      createdAt: mockFhirTask.authoredOn,
      patientName: data.patientId === "p1" ? "Sarah Johnson" : 
                   data.patientId === "p2" ? "Michael Williams" : 
                   data.patientId === "p3" ? "David Brown" : "",
      assigneeName: data.assigneeId === "u1" ? "Dr. Jane Smith" : 
                    data.assigneeId === "u2" ? "Dr. Robert Chen" : 
                    data.assigneeId === "u3" ? "Nurse Wilson" : ""
    });

    console.log("Updating FHIR task:", fhirTask);
    // In a real app, you would make an API call here to update the FHIR resource
    toast("Task updated successfully");
    navigate("/tasks");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Edit Task</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskForm
            initialData={task}
            onSubmit={handleSubmit}
            isEditing
          />
        </CardContent>
      </Card>
    </div>
  );
}
