
import { TaskDetail } from "@/components/task/TaskDetail";
import { useParams } from "react-router-dom";
import { fromFHIRTask, FHIRTask } from "@/lib/fhir/types";

export default function ViewTask() {
  const { id } = useParams();

  // Mock data - in a real app, you would fetch this from a FHIR API
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
      end: "2025-04-02T14:00:00Z" 
    },
    owner: {
      reference: "Practitioner/u1",
      display: "Dr. Jane Smith"
    }
  };

  // Convert FHIR task to app task format
  const task = fromFHIRTask(mockFhirTask);

  // Add non-FHIR properties that our UI expects
  task.dueDate = "Today, 2:00 PM";
  task.case = { id: "c1", caseId: "CSE-1234" };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <TaskDetail task={task} />
    </div>
  );
}
