import { StatsCard } from "@/components/dashboard/StatsCard";
import { TaskList } from "@/components/dashboard/TaskList";
import { CaseList } from "@/components/dashboard/CaseList";
import { PatientList } from "@/components/dashboard/PatientList";
import { User } from "@/types/user";
import { Activity, ClipboardCheck, ClipboardList, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface SupportStaffDashboardProps {
  currentUser: User;
}
export const SupportStaffDashboard = ({
  currentUser
}: SupportStaffDashboardProps) => {
  const navigate = useNavigate();

  // Mock data for demonstration purposes
  const cases = [{
    id: "c1",
    caseId: "CSE-1234",
    subject: "Post-surgery follow-up inquiry",
    status: "in-progress" as const,
    patient: {
      id: "p1",
      name: "Sarah Johnson"
    },
    priority: "high" as const,
    createdDate: "Apr 10, 2023",
    sla: {
      status: "at-risk" as const,
      timeRemaining: "2 hours remaining"
    }
  }, {
    id: "c2",
    caseId: "CSE-1235",
    subject: "Insurance claim dispute",
    status: "open" as const,
    patient: {
      id: "p2",
      name: "Michael Williams"
    },
    priority: "medium" as const,
    createdDate: "Apr 9, 2023",
    sla: {
      status: "on-track" as const,
      timeRemaining: "1 day remaining"
    }
  }, {
    id: "c3",
    caseId: "CSE-1236",
    subject: "Appointment rescheduling request",
    status: "pending" as const,
    patient: {
      id: "p3",
      name: "David Brown"
    },
    priority: "low" as const,
    createdDate: "Apr 8, 2023"
  }];
  const tasks = [{
    id: "1",
    title: "Follow up with patient Sarah Johnson about medication",
    priority: "high" as const,
    patient: {
      id: "p1",
      name: "Sarah Johnson"
    },
    dueDate: "Today, 2:00 PM",
    completed: false
  }, {
    id: "2",
    title: "Review lab results for Michael Williams",
    priority: "medium" as const,
    patient: {
      id: "p2",
      name: "Michael Williams"
    },
    dueDate: "Today, 4:30 PM",
    completed: false
  }, {
    id: "3",
    title: "Call pharmacy about prescription refill",
    priority: "medium" as const,
    patient: {
      id: "p3",
      name: "David Brown"
    },
    dueDate: "Tomorrow, 10:00 AM",
    completed: false
  }];
  const patients = [{
    id: "p1",
    name: "Sarah Johnson",
    crn: "CRN-12345",
    lastInteraction: "10 minutes ago",
    isHighRisk: true
  }, {
    id: "p2",
    name: "Michael Williams",
    crn: "CRN-23456",
    lastInteraction: "2 hours ago"
  }, {
    id: "p3",
    name: "David Brown",
    crn: "CRN-34567",
    lastInteraction: "Yesterday"
  }];
  const communications = [{
    id: "comm1",
    type: "email",
    case: {
      id: "c1",
      caseId: "CSE-1234"
    },
    patient: {
      id: "p1",
      name: "Sarah Johnson"
    },
    message: "Sent post-surgery care instructions via email",
    timestamp: "Today, 10:23 AM"
  }, {
    id: "comm2",
    type: "call",
    case: {
      id: "c2",
      caseId: "CSE-1235"
    },
    patient: {
      id: "p2",
      name: "Michael Williams"
    },
    message: "Discussed insurance claim dispute resolution options",
    timestamp: "Today, 9:15 AM"
  }, {
    id: "comm3",
    type: "note",
    case: {
      id: "c3",
      caseId: "CSE-1236"
    },
    patient: {
      id: "p3",
      name: "David Brown"
    },
    message: "Added note about preferred appointment times",
    timestamp: "Yesterday, 3:30 PM"
  }];
  const handleTaskComplete = (taskId: string, completed: boolean) => {
    console.log(`Task ${taskId} marked as ${completed ? "completed" : "incomplete"}`);
  };
  const handleViewPatient = (patientId: string) => {
    navigate(`/patients/${patientId}`);
  };
  const handleViewCase = (caseId: string) => {
    navigate(`/cases/${caseId}`);
  };
  return <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative w-full max-w-md mx-auto lg:mx-0">
        <input type="text" placeholder="Search patients, cases or tasks..." className="w-full h-10 pl-10 pr-4 text-gray-900 placeholder-white-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-slate-100" />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Activity className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Key Workload Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="My Open Cases" value={cases.length.toString()} icon={ClipboardList} trend={{
        value: 2,
        isPositive: false
      }} description="vs. last week" />
        <StatsCard title="My Tasks Due Soon" value={tasks.length.toString()} icon={ClipboardCheck} description="Today & Tomorrow" />
        <StatsCard title="Cases At Risk" value="1" icon={Clock} trend={{
        value: 15,
        isPositive: true
      }} description="SLA at risk" />
        <StatsCard title="Avg. Resolution Time" value="1.7 days" icon={Activity} trend={{
        value: 12,
        isPositive: true
      }} description="vs. last month" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <CaseList title="My Open Cases" description="Cases assigned to you" cases={cases} onViewCase={handleViewCase} />
        <TaskList title="My Tasks" description="Tasks requiring your attention" tasks={tasks} onTaskComplete={handleTaskComplete} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="md:col-span-1 lg:col-span-3">
          <PatientList title="Recently Viewed Patients" patients={patients} onViewPatient={handleViewPatient} onViewAllPatients={() => navigate('/patients')} />
        </div>
        <div className="md:col-span-1 lg:col-span-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Case Communications</CardTitle>
            </CardHeader>
            <CardContent className="px-0 pt-0">
              <div className="space-y-4">
                {communications.map(comm => <div key={comm.id} className="flex gap-4 px-6 py-2 hover:bg-muted/50">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={currentUser.avatar} />
                      <AvatarFallback>{currentUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{currentUser.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {comm.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{comm.timestamp}</span>
                      </div>
                      <p className="text-sm">{comm.message}</p>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <span>Case:</span>
                        <button className="text-primary hover:underline" onClick={() => navigate(`/cases/${comm.case.id}`)}>
                          {comm.case.caseId}
                        </button>
                        <span>•</span>
                        <span>Patient:</span>
                        <button className="text-primary hover:underline" onClick={() => navigate(`/patients/${comm.patient.id}`)}>
                          {comm.patient.name}
                        </button>
                      </div>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
};