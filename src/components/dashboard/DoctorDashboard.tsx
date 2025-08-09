import { TaskList } from "@/components/dashboard/TaskList";
import { PatientList } from "@/components/dashboard/PatientList";
import { User } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { PatientSearch } from "./PatientSearch";
import { StatsCardGrid } from "./StatsCardGrid";
import { AppointmentList } from "./AppointmentList";
import { QuickActions } from "./QuickActions";
import { RecentCommunications } from "./RecentCommunications";
import { PatientStatusManager } from "./PatientStatusManager";
import { RecentReports } from "./RecentReports";
import { FeedbackProtocols } from "./FeedbackProtocols";
import { DoctorNotesCard } from "./DoctorNotesCard";
import { FloatingNotepad } from "./FloatingNotepad";
import { mockTasks, mockAppointments, mockPatients } from "@/data/mockDashboardData";

interface DoctorDashboardProps {
  currentUser: User;
}

export const DoctorDashboard = ({ currentUser }: DoctorDashboardProps) => {
  const navigate = useNavigate();

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    console.log(`Task ${taskId} marked as ${completed ? "completed" : "incomplete"}`);
  };

  const handleViewPatient = (patientId: string) => {
    navigate(`/patients/${patientId}`);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-healthcare-primary to-healthcare-accent rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, Dr. {currentUser.name}</h1>
        <p className="text-healthcare-light opacity-90">Here's what needs your attention today</p>
      </div>

      {/* Patient Search */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold mb-4 text-healthcare-dark">Quick Patient Access</h2>
        <PatientSearch />
      </div>

      {/* Key Metrics */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-healthcare-dark">Today's Overview</h2>
        <StatsCardGrid />
      </div>

      {/* Patient Status Management */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-healthcare-dark">Patient Management</h2>
        <PatientStatusManager />
      </div>

      {/* Doctor Notes Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-healthcare-dark">Doctor Notes</h2>
        <DoctorNotesCard />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Tasks & Appointments */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-healthcare-dark">Tasks & Schedule</h3>
            <div className="space-y-4">
              <TaskList 
                title="Clinical Tasks" 
                description="Urgent clinical tasks requiring attention"
                tasks={mockTasks}
                onTaskComplete={handleTaskComplete}
              />
              <AppointmentList appointments={mockAppointments} />
            </div>
          </div>
        </div>

        {/* Middle Column - Communications & Reports */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-healthcare-dark">Communications & Reports</h3>
            <div className="space-y-4">
              <RecentCommunications />
              <RecentReports />
            </div>
          </div>
        </div>

        {/* Right Column - Protocols & Patients */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-healthcare-dark">Protocols & Patients</h3>
            <div className="space-y-4">
              <FeedbackProtocols />
              <PatientList
                title="Recent Patients"
                patients={mockPatients.slice(0, 5)}
                onViewPatient={handleViewPatient}
                onViewAllPatients={() => navigate('/patients')}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4 text-healthcare-dark">Quick Actions</h2>
        <QuickActions />
      </div>

      {/* Floating Notepad - only visible for doctors */}
      <FloatingNotepad />
    </div>
  );
};
