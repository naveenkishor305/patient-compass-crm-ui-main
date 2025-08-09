
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

import { CaseHeader } from "@/components/case/CaseHeader";
import { SLAStatusCard } from "@/components/case/SLAStatus";
import { PatientInfoCard } from "@/components/case/PatientInfoCard";
import { AssigneeCard } from "@/components/case/AssigneeCard";
import { QuickActionsCard } from "@/components/case/QuickActionsCard";
import { CaseDetailsTab } from "@/components/case/CaseDetailsTab";
import { CommunicationsTab } from "@/components/case/CommunicationsTab";
import { TasksTab } from "@/components/case/TasksTab";
import { HistoryTab } from "@/components/case/HistoryTab";

const CaseDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  // Mock case data for demonstration
  const caseData = {
    id: id || "c1",
    caseId: "CSE-1234",
    subject: "Post-surgery follow-up inquiry",
    description:
      "Patient is experiencing increased pain at the incision site and is concerned about potential infection. Needs urgent medical advice.",
    status: "in-progress",
    priority: "high",
    type: "Medical Concern",
    subType: "Post-Procedure Complication",
    channel: "Phone",
    createdDate: "April 10, 2023 - 10:45 AM",
    createdBy: "Dr. Jane Smith",
    assignee: {
      id: "u1",
      name: "Dr. Jane Smith",
      role: "Cardiologist",
    },
    patient: {
      id: "p1",
      name: "Sarah Johnson",
      crn: "CRN-12345",
      isHighRisk: true,
    },
    sla: {
      status: "at-risk",
      target: "April 11, 2023 - 10:45 AM",
      timeRemaining: "2 hours remaining",
      progress: 80,
    },
  };

  // Mock data for the tabs
  const tasks = [
    {
      id: "1",
      title: "Call patient to discuss pain management options",
      priority: "high" as const,
      patient: { id: "p1", name: caseData.patient.name },
      dueDate: "Today, 2:00 PM",
      completed: false,
    },
    {
      id: "2",
      title: "Schedule emergency appointment if needed",
      priority: "medium" as const,
      patient: { id: "p1", name: caseData.patient.name },
      dueDate: "Today, 5:00 PM",
      completed: false,
    },
    {
      id: "3",
      title: "Follow up with patient about symptoms",
      priority: "medium" as const,
      patient: { id: "p1", name: caseData.patient.name },
      dueDate: "Tomorrow, 10:00 AM",
      completed: false,
    },
  ];

  const communications = [
    {
      id: "com1",
      type: "System",
      date: "April 10, 2023 - 10:45 AM",
      content: "Case created and assigned to Dr. Jane Smith",
      user: "System",
    },
    {
      id: "com2",
      type: "Note",
      date: "April 10, 2023 - 11:15 AM",
      content:
        "Called patient to discuss concerns. Patient reports increased pain and redness around incision site. Advised to monitor temperature and take prescribed pain medication. Will schedule urgent appointment if symptoms worsen.",
      user: "Dr. Jane Smith",
    },
    {
      id: "com3",
      type: "Email",
      date: "April 10, 2023 - 11:30 AM",
      content:
        "Email sent to patient with post-surgical care instructions and contact information for emergency services if needed.",
      user: "Dr. Jane Smith",
    },
    {
      id: "com4",
      type: "System",
      date: "April 10, 2023 - 2:30 PM",
      content: "Case escalated due to high priority",
      user: "System",
    },
  ];

  const history = [
    {
      id: "h1",
      date: "April 10, 2023 - 10:45 AM",
      action: "Case Created",
      user: "Dr. Jane Smith",
      details: "Case created with high priority",
    },
    {
      id: "h2",
      date: "April 10, 2023 - 10:45 AM",
      action: "Assignment",
      user: "System",
      details: "Case assigned to Dr. Jane Smith",
    },
    {
      id: "h3",
      date: "April 10, 2023 - 11:00 AM",
      action: "Status Change",
      user: "Dr. Jane Smith",
      details: 'Status changed from "Open" to "In Progress"',
    },
    {
      id: "h4",
      date: "April 10, 2023 - 11:15 AM",
      action: "Note Added",
      user: "Dr. Jane Smith",
      details: "Communication note added to case",
    },
    {
      id: "h5",
      date: "April 10, 2023 - 11:30 AM",
      action: "Email Sent",
      user: "Dr. Jane Smith",
      details: "Email sent to patient",
    },
    {
      id: "h6",
      date: "April 10, 2023 - 2:30 PM",
      action: "Escalation",
      user: "System",
      details: "Case escalated due to high priority",
    },
  ];

  return (
    <div className="space-y-6">
      <CaseHeader caseData={caseData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="details">
            <TabsList className="w-full max-w-md">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="communications">Communications</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <CaseDetailsTab caseData={caseData} />
            </TabsContent>

            <TabsContent value="communications">
              <CommunicationsTab communications={communications} />
            </TabsContent>

            <TabsContent value="tasks">
              <TasksTab tasks={tasks} />
            </TabsContent>

            <TabsContent value="history">
              <HistoryTab history={history} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <SLAStatusCard sla={caseData.sla} />
          <PatientInfoCard patient={caseData.patient} />
          <AssigneeCard assignee={caseData.assignee} />
          <QuickActionsCard 
            caseData={{ id: caseData.id, caseId: caseData.caseId }}
            patient={caseData.patient}
          />
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;
