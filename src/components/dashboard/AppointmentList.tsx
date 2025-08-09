
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Appointment {
  id: string;
  patient: {
    id: string;
    name: string;
  };
  time: string;
  provider: string;
  type: string;
}

interface AppointmentListProps {
  appointments: Appointment[];
}

export const AppointmentList = ({ appointments }: AppointmentListProps) => {
  const navigate = useNavigate();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-1">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-start justify-between px-6 py-4 hover:bg-muted/50"
            >
              <div className="space-y-1">
                <div className="font-medium">
                  {appointment.patient.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {appointment.time} • {appointment.provider} • {appointment.type}
                </div>
              </div>
              <button
                className="text-sm text-primary hover:underline"
                onClick={() => navigate(`/patients/${appointment.patient.id}`)}
              >
                View
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
