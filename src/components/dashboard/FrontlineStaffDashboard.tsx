
import { TaskList } from "@/components/dashboard/TaskList";
import { PatientList } from "@/components/dashboard/PatientList";
import { User } from "@/types/user";
import { useNavigate } from "react-router-dom";
import { PatientSearch } from "./PatientSearch";
import { StatsCardGrid } from "./StatsCardGrid";
import { AppointmentList } from "./AppointmentList";
import { QuickActions } from "./QuickActions";
import { mockTasks, mockAppointments, mockPatients } from "@/data/mockDashboardData";

interface FrontlineStaffDashboardProps {
  currentUser: User;
}

export const FrontlineStaffDashboard = ({ currentUser }: FrontlineStaffDashboardProps) => {
  const navigate = useNavigate();

  const handleTaskComplete = (taskId: string, completed: boolean) => {
    console.log(`Task ${taskId} marked as ${completed ? "completed" : "incomplete"}`);
  };

  const handleViewPatient = (patientId: string) => {
    navigate(`/patients/${patientId}`);
  };

  return (
    <div className="space-y-6">
      {/* Prominent Search Bar */}
      <PatientSearch />

      {/* Key Immediate Metrics */}
      <StatsCardGrid />

      {/* Tasks and Appointments */}
      <div className="grid gap-6 md:grid-cols-2">
        <TaskList 
          title="My Tasks" 
          description="Tasks requiring your attention today"
          tasks={mockTasks}
          onTaskComplete={handleTaskComplete}
        />
        <AppointmentList appointments={mockAppointments} />
      </div>

      {/* Recently Viewed Patients */}
      <div>
        <PatientList
          title="Recently Viewed Patients"
          patients={mockPatients}
          onViewPatient={handleViewPatient}
          onViewAllPatients={() => navigate('/patients')}
        />
      </div>

      {/* Quick Action Buttons */}
      <QuickActions />
    </div>
  );
};
