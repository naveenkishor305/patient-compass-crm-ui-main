import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  AlertTriangle, 
  ClipboardList, 
  Mail, 
  Phone, 
  UserX,
  IdCard,
} from "lucide-react";
import { TaskList } from "@/components/dashboard/TaskList";
import { CaseList } from "@/components/dashboard/CaseList";
import { BackNavigationHeader } from "@/components/navigation/BackNavigationHeader";
import { useToast } from "@/hooks/use-toast";
import { PatientStatusDialog } from "@/components/dashboard/PatientStatusDialog";
import { PatientOverviewTab } from "@/components/patient/PatientOverviewTab";
import { PatientTimelineTab } from "@/components/patient/PatientTimelineTab";
import { PatientAppointmentsTab } from "@/components/patient/PatientAppointmentsTab";
import { PatientMedicalTab } from "@/components/patient/PatientMedicalTab";
import { PatientVisitHistoryTab } from "@/components/patient/PatientVisitHistoryTab";
import { PatientFeedbackTab } from "@/components/patient/PatientFeedbackTab";
import { PatientPreferencesTab } from "@/components/patient/PatientPreferencesTab";
import { PatientDialogs } from "@/components/patient/PatientDialogs";

const PatientProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // State for modal visibility
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
  const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
  const [isNotesDialogOpen, setIsNotesDialogOpen] = useState(false);
  const [isCreateCaseDialogOpen, setIsCreateCaseDialogOpen] = useState(false);
  const [isEditPreferencesDialogOpen, setIsEditPreferencesDialogOpen] = useState(false);
  const [isPatientStatusDialogOpen, setIsPatientStatusDialogOpen] = useState(false);
  const [selectedStatusAction, setSelectedStatusAction] = useState<"inactive" | "deceased" | null>(null);

  // Mock patient data for demonstration
  const patient = {
    id: id || 'p1',
    name: "Sarah Johnson",
    crn: "CRN-12345",
    dateOfBirth: "12/24/1985",
    gender: "Female",
    contactNumber: "+1 (555) 123-4567",
    email: "sarah.johnson@example.com",
    address: "123 Main Street, Anytown, USA",
    medicalRecordNumber: "MRN-98765",
    healthId: "NHI-5432109",
    insuranceProvider: "BlueCross Health",
    insurancePolicyNumber: "BC-567890",
    primaryPhysician: "Dr. Robert Chen",
    isVIP: false,
    isHighRisk: true,
    preferredContactMethod: "Phone",
    preferredLanguage: "English",
    lastVisit: "March 15, 2023",
    registrationDate: "January 10, 2015",
    allergies: ["Penicillin", "Sulfa drugs"],
    chronicConditions: ["Hypertension", "Type 2 Diabetes"],
  };

  // Mock data for the tabs
  const tasks = [
    {
      id: "1",
      title: "Follow up about medication side effects",
      priority: "high" as const,
      patient: { id: id || "p1", name: patient.name },
      dueDate: "Today, 2:00 PM",
      completed: false,
    },
    {
      id: "2",
      title: "Schedule follow-up appointment",
      priority: "medium" as const,
      patient: { id: id || "p1", name: patient.name },
      dueDate: "Tomorrow, 10:00 AM",
      completed: false,
    },
    {
      id: "3",
      title: "Review new lab results",
      priority: "low" as const,
      patient: { id: id || "p1", name: patient.name },
      dueDate: "Apr 15, 9:00 AM",
      completed: true,
    },
  ];

  const cases = [
    {
      id: "c1",
      caseId: "CSE-1234",
      subject: "Post-surgery follow-up inquiry",
      status: "in-progress" as const,
      patient: { id: id || "p1", name: patient.name },
      priority: "high" as const,
      createdDate: "Apr 10, 2023",
      sla: { status: "at-risk" as const, timeRemaining: "2 hours remaining" },
    },
    {
      id: "c4",
      caseId: "CSE-1237",
      subject: "Medication side effects report",
      status: "open" as const,
      patient: { id: id || "p1", name: patient.name },
      priority: "high" as const,
      createdDate: "Mar 27, 2023",
      sla: { status: "breached" as const },
    },
    {
      id: "c5",
      caseId: "CSE-1195",
      subject: "Insurance coverage question",
      status: "resolved" as const,
      patient: { id: id || "p1", name: patient.name },
      priority: "medium" as const,
      createdDate: "Feb 15, 2023",
    },
  ];

  // Mock data for the new tabs
  const interactions = [
    {
      id: "i1",
      type: "Call",
      date: "April 10, 2023 - 10:30 AM",
      description: "Patient called to discuss medication side effects.",
      agent: "Dr. Jane Smith",
    },
    {
      id: "i2",
      type: "Case Created",
      date: "April 10, 2023 - 10:45 AM",
      description: "Created case CSE-1234 for post-surgery follow-up inquiry.",
      agent: "Dr. Jane Smith",
      caseId: "CSE-1234",
    },
    {
      id: "i3",
      type: "Email",
      date: "April 8, 2023 - 2:15 PM",
      description: "Sent appointment reminder email for upcoming checkup.",
      agent: "System",
    },
    {
      id: "i4",
      type: "Visit",
      date: "March 15, 2023 - 9:00 AM",
      description: "Post-surgery checkup. Healing well, minor discomfort reported.",
      agent: "Dr. Robert Chen",
    },
    {
      id: "i5",
      type: "Case Created",
      date: "March 27, 2023 - 11:20 AM",
      description: "Created case CSE-1237 for medication side effects report.",
      agent: "Nurse Wilson",
      caseId: "CSE-1237",
    },
    {
      id: "i6",
      type: "SMS",
      date: "March 26, 2023 - 3:45 PM",
      description: "Sent medication reminder via SMS.",
      agent: "System",
    },
    {
      id: "i7",
      type: "Feedback",
      date: "March 16, 2023 - 10:00 AM",
      description: "Patient submitted feedback on recent hospital visit. CSAT Score: 4/5",
      agent: "System",
    },
  ];

  const appointments = [
    {
      id: "a1",
      date: "April 20, 2023 - 10:30 AM",
      purpose: "Follow-up checkup",
      provider: "Dr. Robert Chen",
      department: "Cardiology",
      status: "Scheduled",
    },
    {
      id: "a2",
      date: "March 15, 2023 - 9:00 AM",
      purpose: "Post-surgery checkup",
      provider: "Dr. Robert Chen",
      department: "Cardiology",
      status: "Completed",
      notes: "Patient is recovering well from surgery. Blood pressure is now within normal range. Prescribed continued medication and scheduled a follow-up in one month."
    },
    {
      id: "a3",
      date: "February 1, 2023 - 11:15 AM",
      purpose: "Surgery",
      provider: "Dr. Elizabeth Lee",
      department: "Surgery",
      status: "Completed",
      notes: "Coronary artery bypass grafting performed successfully. Patient tolerated the procedure well. No immediate complications."
    },
  ];
  
  const medicalRecords = [
    {
      id: "m1",
      date: "March 15, 2023",
      type: "Clinical Note",
      provider: "Dr. Robert Chen",
      summary: "Post-surgery follow-up. Patient recovering well with expected progress.",
      details: "Patient reports mild discomfort at incision site but no signs of infection. Vital signs stable. Cardiac function improving based on latest echocardiogram."
    },
    {
      id: "m2",
      date: "February 1, 2023",
      type: "Procedure Note",
      provider: "Dr. Elizabeth Lee",
      summary: "Coronary artery bypass grafting. Procedure completed successfully without complications.",
      details: "Triple bypass performed using left internal mammary artery and saphenous vein grafts. Total bypass time: 112 minutes. Patient transferred to ICU in stable condition."
    },
    {
      id: "m3",
      date: "January 25, 2023",
      type: "Lab Results",
      provider: "Dr. Robert Chen",
      summary: "Pre-surgery blood work and diagnostics. All values within acceptable ranges for procedure.",
      details: "Complete blood count, metabolic panel, coagulation studies, and cardiac enzymes reviewed. All parameters acceptable for scheduled procedure."
    },
    {
      id: "m4",
      date: "January 10, 2023",
      type: "Clinical Note",
      provider: "Dr. Robert Chen",
      summary: "Initial consultation for coronary artery disease. Recommended CABG procedure.",
      details: "Patient presents with stable angina, unresponsive to medical therapy. Cardiac catheterization shows significant three-vessel disease. CABG recommended as optimal treatment strategy."
    },
  ];

  const visitHistory = [
    {
      id: "v1",
      date: "March 15, 2023",
      type: "Outpatient",
      department: "Cardiology",
      provider: "Dr. Robert Chen",
      summary: "Post-surgery follow-up visit",
      details: "Patient recovering well. Medication adjusted."
    },
    {
      id: "v2",
      date: "February 1-8, 2023",
      type: "Inpatient",
      department: "Cardiothoracic Surgery",
      provider: "Dr. Elizabeth Lee",
      summary: "Coronary artery bypass grafting",
      details: "Successful triple bypass surgery. 7-day hospital stay."
    },
    {
      id: "v3",
      date: "January 10, 2023",
      type: "Outpatient",
      department: "Cardiology",
      provider: "Dr. Robert Chen",
      summary: "Consultation",
      details: "Initial consultation for coronary artery disease."
    },
  ];

  const feedbackHistory = [
    {
      id: "f1",
      date: "March 16, 2023",
      type: "Post-Visit Survey",
      overallScore: 4.5,
      submittedFor: "Cardiology Visit (March 15, 2023)",
      responses: [
        { question: "How would you rate your overall experience?", answer: "4/5" },
        { question: "Was the doctor attentive to your concerns?", answer: "5/5" },
        { question: "How would you rate the facility cleanliness?", answer: "4/5" },
        { question: "How likely are you to recommend us to family or friends?", answer: "5/5" },
        { question: "Any additional comments?", answer: "Dr. Chen was very thorough and explained everything clearly." }
      ]
    },
    {
      id: "f2",
      date: "February 10, 2023",
      type: "Inpatient Experience",
      overallScore: 4.0,
      submittedFor: "Hospital Stay (February 1-8, 2023)",
      responses: [
        { question: "How would you rate your overall hospital stay?", answer: "4/5" },
        { question: "How would you rate the nursing care?", answer: "5/5" },
        { question: "How would you rate the food quality?", answer: "3/5" },
        { question: "How well was your pain managed?", answer: "4/5" },
        { question: "Any suggestions for improvement?", answer: "The food could be better, but the care was excellent." }
      ]
    }
  ];

  // Function to download appointment notes as PDF
  const downloadNotes = (appointmentId: string) => {
    toast({
      title: "PDF Download Started",
      description: "Your appointment notes are being downloaded.",
    });
  };

  // Handle creating a new case
  const handleCreateCase = () => {
    toast({
      title: "Case Created",
      description: "New case has been created successfully.",
    });
    setIsCreateCaseDialogOpen(false);
  };

  // Handle scheduling/rescheduling an appointment
  const handleScheduleAppointment = () => {
    toast({
      title: "Appointment Scheduled",
      description: "The appointment has been scheduled successfully.",
    });
    setIsAppointmentDialogOpen(false);
  };
  
  const handleRescheduleAppointment = () => {
    toast({
      title: "Appointment Rescheduled",
      description: "The appointment has been rescheduled successfully.",
    });
    setIsRescheduleDialogOpen(false);
  };
  
  // Handle updating patient preferences
  const handleUpdatePreferences = () => {
    toast({
      title: "Preferences Updated",
      description: "Patient preferences have been updated successfully.",
    });
    setIsEditPreferencesDialogOpen(false);
  };

  const handlePatientStatusChange = (action: "inactive" | "deceased") => {
    setSelectedStatusAction(action);
    setIsPatientStatusDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <BackNavigationHeader title="Patient Profile" />

      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="text-lg">
              {patient.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              {patient.name}
              {patient.isVIP && <span className="vip-badge ml-2">VIP</span>}
              {patient.isHighRisk && (
                <Badge variant="outline" className="bg-patient-highrisk text-white border-none ml-1">
                  <AlertTriangle className="h-3 w-3 mr-1" /> High Risk
                </Badge>
              )}
            </h1>
            <div className="text-muted-foreground space-x-2">
              <span>CRN: {patient.crn}</span>
              <span>•</span>
              <span>DOB: {patient.dateOfBirth}</span>
              <span>•</span>
              <span>MRN: {patient.medicalRecordNumber}</span>
              <span>•</span>
              <span className="flex items-center"><IdCard className="h-3 w-3 mr-1" /> Health ID: {patient.healthId}</span>
            </div>
            <div className="text-muted-foreground flex gap-3 mt-1">
              <span className="flex items-center"><Phone className="h-3 w-3 mr-1" /> {patient.contactNumber}</span>
              <span className="flex items-center"><Mail className="h-3 w-3 mr-1" /> {patient.email}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Button variant="outline">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
          <Button variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
          <Button onClick={() => setIsCreateCaseDialogOpen(true)}>
            <ClipboardList className="h-4 w-4 mr-2" />
            Create Case
          </Button>
          <Button 
            variant="outline" 
            onClick={() => handlePatientStatusChange("inactive")}
            className="border-amber-200 text-amber-700 hover:bg-amber-50"
          >
            <UserX className="h-4 w-4 mr-2" />
            Change Status
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4 w-full max-w-3xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="cases">Cases</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="medical">Medical</TabsTrigger>
          <TabsTrigger value="visits">Visit History</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <PatientOverviewTab patient={patient} cases={cases} tasks={tasks} />
        </TabsContent>

        <TabsContent value="cases">
          <CaseList
            title="Patient Cases"
            cases={cases}
          />
        </TabsContent>

        <TabsContent value="tasks">
          <TaskList
            title="Patient Tasks"
            tasks={tasks}
            onTaskComplete={() => {}}
          />
        </TabsContent>

        <TabsContent value="timeline">
          <PatientTimelineTab interactions={interactions} />
        </TabsContent>

        <TabsContent value="appointments">
          <PatientAppointmentsTab 
            appointments={appointments}
            onScheduleAppointment={() => setIsAppointmentDialogOpen(true)}
            onReschedule={() => setIsRescheduleDialogOpen(true)}
            onViewNotes={() => setIsNotesDialogOpen(true)}
          />
        </TabsContent>

        <TabsContent value="medical">
          <PatientMedicalTab 
            medicalRecords={medicalRecords}
            onDownloadNotes={downloadNotes}
          />
        </TabsContent>

        <TabsContent value="visits">
          <PatientVisitHistoryTab visitHistory={visitHistory} />
        </TabsContent>
        
        <TabsContent value="feedback">
          <PatientFeedbackTab feedbackHistory={feedbackHistory} />
        </TabsContent>

        <TabsContent value="preferences">
          <PatientPreferencesTab 
            patient={patient}
            onEditPreferences={() => setIsEditPreferencesDialogOpen(true)}
          />
        </TabsContent>
      </Tabs>

      <PatientDialogs
        isCreateCaseDialogOpen={isCreateCaseDialogOpen}
        setIsCreateCaseDialogOpen={setIsCreateCaseDialogOpen}
        isAppointmentDialogOpen={isAppointmentDialogOpen}
        setIsAppointmentDialogOpen={setIsAppointmentDialogOpen}
        isRescheduleDialogOpen={isRescheduleDialogOpen}
        setIsRescheduleDialogOpen={setIsRescheduleDialogOpen}
        isNotesDialogOpen={isNotesDialogOpen}
        setIsNotesDialogOpen={setIsNotesDialogOpen}
        isEditPreferencesDialogOpen={isEditPreferencesDialogOpen}
        setIsEditPreferencesDialogOpen={setIsEditPreferencesDialogOpen}
        patient={patient}
        onCreateCase={handleCreateCase}
        onScheduleAppointment={handleScheduleAppointment}
        onRescheduleAppointment={handleRescheduleAppointment}
        onUpdatePreferences={handleUpdatePreferences}
        onDownloadNotes={downloadNotes}
      />

      {/* Patient Status Dialog */}
      <PatientStatusDialog 
        isOpen={isPatientStatusDialogOpen} 
        onClose={() => setIsPatientStatusDialogOpen(false)} 
        action={selectedStatusAction} 
      />
    </div>
  );
};

export default PatientProfile;
