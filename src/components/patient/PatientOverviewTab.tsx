
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Calendar } from "lucide-react";
import { CaseList } from "@/components/dashboard/CaseList";
import { TaskList } from "@/components/dashboard/TaskList";

interface PatientOverviewTabProps {
  patient: any;
  cases: any[];
  tasks: any[];
}

export const PatientOverviewTab = ({ patient, cases, tasks }: PatientOverviewTabProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
          <CardDescription>Personal and contact details</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Full Name:</span>
            <span className="font-medium">{patient.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Gender:</span>
            <span className="font-medium">{patient.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Date of Birth:</span>
            <span className="font-medium">{patient.dateOfBirth}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Contact Number:</span>
            <span className="font-medium">{patient.contactNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Email:</span>
            <span className="font-medium">{patient.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Address:</span>
            <span className="font-medium">{patient.address}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Health ID:</span>
            <span className="font-medium">{patient.healthId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Registration Date:</span>
            <span className="font-medium">{patient.registrationDate}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Status:</span>
            <div className="flex gap-2">
              {patient.isVIP && <span className="vip-badge">VIP</span>}
              {patient.isHighRisk && <span className="high-risk-badge">High Risk</span>}
              {!patient.isVIP && !patient.isHighRisk && <span className="font-medium">Standard</span>}
            </div>
          </div>
          <div className="flex justify-end mt-2">
            <Button variant="ghost" size="sm" className="flex items-center">
              <Edit className="h-4 w-4 mr-1" />
              Edit Information
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Medical Information</CardTitle>
          <CardDescription>Healthcare and insurance details</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Primary Physician:</span>
            <span className="font-medium">{patient.primaryPhysician}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Insurance Provider:</span>
            <span className="font-medium">{patient.insuranceProvider}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Policy Number:</span>
            <span className="font-medium">{patient.insurancePolicyNumber}</span>
          </div>
          <div className="flex justify-between flex-col">
            <span className="text-muted-foreground mb-1">Allergies:</span>
            <div className="flex flex-wrap gap-1">
              {patient.allergies.map((allergy: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {allergy}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex justify-between flex-col">
            <span className="text-muted-foreground mb-1">Chronic Conditions:</span>
            <div className="flex flex-wrap gap-1">
              {patient.chronicConditions.map((condition: string, index: number) => (
                <Badge key={index} variant="secondary">
                  {condition}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Last Visit:</span>
            <span className="font-medium">{patient.lastVisit}</span>
          </div>
          <div className="flex justify-end mt-2">
            <Button variant="ghost" size="sm" className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              View Full Medical History
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-healthcare-primary">3</div>
            <div className="text-sm text-muted-foreground">Active Cases</div>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-healthcare-secondary">8</div>
            <div className="text-sm text-muted-foreground">Total Interactions</div>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-healthcare-accent">3</div>
            <div className="text-sm text-muted-foreground">Upcoming Appointments</div>
          </div>
          <div className="bg-muted rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-healthcare-success">4/5</div>
            <div className="text-sm text-muted-foreground">Avg. CSAT Score</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Cases</CardTitle>
        </CardHeader>
        <CardContent>
          <CaseList
            title=""
            cases={cases.slice(0, 2)}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskList
            title=""
            tasks={tasks.filter(t => !t.completed).slice(0, 2)}
          />
        </CardContent>
      </Card>
    </div>
  );
};
