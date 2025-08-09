
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Patient {
  id: string;
  name: string;
  crn: string;
  lastInteraction?: string;
  isVIP?: boolean;
  isHighRisk?: boolean;
  avatar?: string;
}

interface PatientListProps {
  title: string;
  description?: string;
  patients: Patient[];
  onViewPatient?: (patientId: string) => void;
  onViewAllPatients?: () => void;
}

export function PatientList({
  title,
  description,
  patients,
  onViewPatient,
  onViewAllPatients,
}: PatientListProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-0">
          {patients.length === 0 ? (
            <div className="px-6 py-3 text-center text-muted-foreground">
              No patients found
            </div>
          ) : (
            patients.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between px-6 py-3 hover:bg-muted/50"
              >
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>
                      {patient.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <span className="font-medium">{patient.name}</span>
                      {patient.isVIP && (
                        <span className="vip-badge ml-2">VIP</span>
                      )}
                      {patient.isHighRisk && (
                        <span className="high-risk-badge ml-2">High Risk</span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      CRN: {patient.crn}
                    </div>
                    {patient.lastInteraction && (
                      <div className="text-xs text-muted-foreground">
                        Last interaction: {patient.lastInteraction}
                      </div>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewPatient?.(patient.id)}
                >
                  View
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
      {onViewAllPatients && (
        <CardFooter className="border-t px-6 py-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={onViewAllPatients}
          >
            View All Patients
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
