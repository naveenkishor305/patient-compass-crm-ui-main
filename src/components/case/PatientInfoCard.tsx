
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AlertTriangle, History, User } from "lucide-react";

interface PatientInfoCardProps {
  patient: {
    id: string;
    name: string;
    crn: string;
    isHighRisk: boolean;
  };
}

export const PatientInfoCard = ({ patient }: PatientInfoCardProps) => {
  return (
    <Card className="enhanced-card overflow-hidden">
      <div className="h-2 w-full bg-gradient-primary"></div>
      <CardHeader>
        <CardTitle>Patient Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Avatar className="ring-2 ring-offset-2 ring-healthcare-primary">
            <AvatarFallback className="bg-gradient-primary text-white">
              {patient.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium flex items-center gap-1">
              {patient.name}
              {patient.isHighRisk && (
                <Badge
                  variant="outline"
                  className="bg-patient-highrisk text-white border-none ml-1 animate-pulse"
                >
                  <AlertTriangle className="h-3 w-3 mr-1" /> High Risk
                </Badge>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              CRN: {patient.crn}
            </div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm" className="w-full group hover:bg-gradient-primary hover:text-white transition-all duration-300">
            <User className="h-4 w-4 mr-1 group-hover:text-white" />
            View Profile
          </Button>
          <Button variant="outline" size="sm" className="w-full group hover:bg-gradient-primary hover:text-white transition-all duration-300">
            <History className="h-4 w-4 mr-1 group-hover:text-white" />
            View History
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
