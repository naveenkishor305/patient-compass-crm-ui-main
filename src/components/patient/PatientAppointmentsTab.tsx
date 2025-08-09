
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PatientAppointmentsTabProps {
  appointments: any[];
  onScheduleAppointment: () => void;
  onReschedule: () => void;
  onViewNotes: () => void;
}

export const PatientAppointmentsTab = ({ 
  appointments, 
  onScheduleAppointment, 
  onReschedule, 
  onViewNotes 
}: PatientAppointmentsTabProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Patient Appointments</CardTitle>
          <CardDescription>Upcoming and past appointments</CardDescription>
        </div>
        <Button onClick={onScheduleAppointment}>
          Schedule Appointment
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Upcoming Appointments</h3>
            {appointments.filter(a => a.status === "Scheduled").length === 0 ? (
              <div className="text-muted-foreground">No upcoming appointments</div>
            ) : (
              <div className="space-y-4">
                {appointments.filter(a => a.status === "Scheduled").map(appointment => (
                  <div key={appointment.id} className="border rounded-md p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{appointment.purpose}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {appointment.date} • {appointment.department} • {appointment.provider}
                        </div>
                      </div>
                      <Badge>{appointment.status}</Badge>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" onClick={onReschedule}>
                        Reschedule
                      </Button>
                      <Button variant="outline" size="sm">Cancel</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-semibold mb-3">Past Appointments</h3>
            <div className="space-y-4">
              {appointments.filter(a => a.status === "Completed").map(appointment => (
                <div key={appointment.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium">{appointment.purpose}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {appointment.date} • {appointment.department} • {appointment.provider}
                      </div>
                    </div>
                    <Badge variant="outline">{appointment.status}</Badge>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" onClick={onViewNotes}>
                      View Notes
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
