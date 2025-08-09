import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Users, Plus, Search, Filter, List, Grid2X2, Phone, Calendar } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientManagement() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const navigate = useNavigate();

  // Mock patient data
  const patients = [
    {
      id: "1",
      name: "John Doe",
      crn: "CRN001",
      phone: "(555) 123-4567",
      lastVisit: "2024-01-15",
      status: "Active",
      isVIP: false,
      riskLevel: "Low"
    },
    {
      id: "2",
      name: "Jane Smith",
      crn: "CRN002",
      phone: "(555) 987-6543",
      lastVisit: "2024-01-10",
      status: "Active",
      isVIP: true,
      riskLevel: "Medium"
    },
    {
      id: "3",
      name: "Bob Johnson",
      crn: "CRN003",
      phone: "(555) 456-7890",
      lastVisit: "2023-12-20",
      status: "Inactive",
      isVIP: false,
      riskLevel: "High"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500 text-white";
      case "Inactive":
        return "bg-gray-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "bg-red-500 text-white";
      case "Medium":
        return "bg-orange-500 text-white";
      case "Low":
        return "bg-green-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Patient Management</h1>
          <p className="text-muted-foreground">
            Manage patient records and information
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Patient
        </Button>
      </div>

      {/* Search, Filter, and View Toggle */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search patients by name, ID, or phone..."
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
        <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value as "list" | "grid")}>
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <Grid2X2 className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,459</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Month</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">-2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Follow-ups Due</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">Due this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Patient List/Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Patients</CardTitle>
          <CardDescription>
            Manage patient records and information
          </CardDescription>
        </CardHeader>
        <CardContent>
          {viewMode === "list" ? (
            <div className="space-y-4">
              {patients.map((patient) => (
                <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{patient.name}</span>
                      {patient.isVIP && <Badge variant="secondary">VIP</Badge>}
                      <Badge className={getRiskColor(patient.riskLevel)}>{patient.riskLevel} Risk</Badge>
                      <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      CRN: {patient.crn} • {patient.phone}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Last visit: {patient.lastVisit}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => navigate(`/patients/${patient.id}`)}>View Profile</Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {patients.map((patient) => (
                <Card key={patient.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{patient.name}</CardTitle>
                      {patient.isVIP && <Badge variant="secondary">VIP</Badge>}
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getRiskColor(patient.riskLevel)}>{patient.riskLevel} Risk</Badge>
                      <Badge className={getStatusColor(patient.status)}>{patient.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium">CRN:</span> {patient.crn}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      {patient.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Last visit: {patient.lastVisit}
                    </div>
                    <Button className="w-full mt-4" variant="outline" onClick={() => navigate(`/patients/${patient.id}`)}>View Profile</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
