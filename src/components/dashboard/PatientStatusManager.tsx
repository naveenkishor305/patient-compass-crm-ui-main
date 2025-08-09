import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserX, AlertTriangle, Activity, Users } from "lucide-react";
import { useState } from "react";
import { PatientStatusDialog } from "./PatientStatusDialog";
export const PatientStatusManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<"inactive" | "deceased" | null>(null);
  const handleStatusChange = (action: "inactive" | "deceased") => {
    setSelectedAction(action);
    setIsDialogOpen(true);
  };
  const criticalPatients = [{
    id: "p1",
    name: "Sarah Johnson",
    status: "Critical",
    lastSeen: "2 hours ago"
  }, {
    id: "p2",
    name: "Michael Chen",
    status: "Stable",
    lastSeen: "1 day ago"
  }, {
    id: "p3",
    name: "Emma Davis",
    status: "Monitoring",
    lastSeen: "3 hours ago"
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "Stable":
        return "bg-green-100 text-green-800 border-green-200";
      case "Monitoring":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  return <>
      <Card className="border-healthcare-primary/20 bg-gradient-to-r from-healthcare-light/50 to-white">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-healthcare-primary/10">
              <Users className="h-5 w-5 text-healthcare-primary" />
            </div>
            <div>
              <span className="text-healthcare-dark">Patient Status Overview</span>
              <p className="text-sm text-muted-foreground font-normal mt-1">
                Monitor and update patient statuses
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Patient Status Cards */}
          <div>
            <h4 className="text-sm font-medium text-healthcare-dark mb-3 flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Current Patient Status
            </h4>
            <div className="grid gap-3 sm:grid-cols-3">
              {criticalPatients.map(patient => <div key={patient.id} className="bg-white rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <h5 className="font-medium text-sm text-healthcare-dark">{patient.name}</h5>
                      <Badge className={`text-xs border ${getStatusColor(patient.status)}`} variant="outline">
                        {patient.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{patient.lastSeen}</p>
                  </div>
                </div>)}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t pt-4">
            
            <div className="flex flex-wrap gap-3">
              
              
            </div>
          </div>
        </CardContent>
      </Card>

      <PatientStatusDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} action={selectedAction} />
    </>;
};