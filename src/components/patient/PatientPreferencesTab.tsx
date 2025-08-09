
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface PatientPreferencesTabProps {
  patient: any;
  onEditPreferences: () => void;
}

export const PatientPreferencesTab = ({ patient, onEditPreferences }: PatientPreferencesTabProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Patient Preferences</CardTitle>
          <CardDescription>Communication and care preferences</CardDescription>
        </div>
        <Button onClick={onEditPreferences}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Preferences
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Preferred Contact Method:</span>
            <span className="font-medium">{patient.preferredContactMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Preferred Language:</span>
            <span className="font-medium">{patient.preferredLanguage}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Appointment Reminders:</span>
            <span className="font-medium">24 hours before</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Medical Information Sharing:</span>
            <span className="font-medium">Authorized with spouse only</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Preferred Appointment Time:</span>
            <span className="font-medium">Mornings</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Newsletter Subscription:</span>
            <span className="font-medium">Yes</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Research Participation:</span>
            <span className="font-medium">Interested in clinical trials</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Emergency Contact:</span>
            <span className="font-medium">John Johnson (Husband)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
