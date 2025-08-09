import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Briefcase, Plus, Search, Filter, Clock, AlertTriangle, List, Grid2X2, User, Calendar } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CaseManagement() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const navigate = useNavigate();

  // Mock case data
  const cases = [
    {
      id: "1",
      caseId: "CS-001",
      title: "Patient medication allergy concern",
      patient: "John Doe",
      assignee: "Dr. Smith",
      priority: "High",
      status: "Open",
      createdDate: "2 hours ago",
      dueDate: "Today 3:00 PM"
    },
    {
      id: "2",
      caseId: "CS-002",
      title: "Insurance claim issue",
      patient: "Jane Smith",
      assignee: "Billing Team",
      priority: "Medium",
      status: "In Progress",
      createdDate: "1 day ago",
      dueDate: "Tomorrow 10:00 AM"
    },
    {
      id: "3",
      caseId: "CS-003",
      title: "Lab results inquiry",
      patient: "Bob Johnson",
      assignee: "Dr. Wilson",
      priority: "Low",
      status: "Pending",
      createdDate: "3 days ago",
      dueDate: "Next week"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-500 text-white";
      case "In Progress":
        return "bg-indigo-500 text-white";
      case "Pending":
        return "bg-amber-500 text-white";
      case "Resolved":
        return "bg-green-500 text-white";
      case "Closed":
        return "bg-gray-500 text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Case Management</h1>
          <p className="text-muted-foreground">
            Track and manage patient cases and support tickets
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Case
        </Button>
      </div>

      {/* Search, Filter, and View Toggle */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search cases by ID, patient, or description..."
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
            <CardTitle className="text-sm font-medium">Total Cases</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">+8% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Cases</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">12</div>
            <p className="text-xs text-muted-foreground">Urgent cases</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <Briefcase className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">15</div>
            <p className="text-xs text-muted-foreground">Cases closed</p>
          </CardContent>
        </Card>
      </div>

      {/* Case List/Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Active Cases</CardTitle>
          <CardDescription>
            Current open cases requiring attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          {viewMode === "list" ? (
            <div className="space-y-4">
              {cases.map((caseItem) => (
                <div key={caseItem.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">#{caseItem.caseId}</span>
                      <Badge className={getPriorityColor(caseItem.priority)}>{caseItem.priority} Priority</Badge>
                      <Badge className={getStatusColor(caseItem.status)}>{caseItem.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {caseItem.title} - {caseItem.patient}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Created {caseItem.createdDate} • Assigned to: {caseItem.assignee} • Due: {caseItem.dueDate}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => navigate(`/cases/${caseItem.id}`)}>View</Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cases.map((caseItem) => (
                <Card key={caseItem.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">#{caseItem.caseId}</CardTitle>
                      <Badge className={getPriorityColor(caseItem.priority)}>{caseItem.priority}</Badge>
                    </div>
                    <Badge className={getStatusColor(caseItem.status)} variant="outline">{caseItem.status}</Badge>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <h4 className="font-medium text-sm">{caseItem.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" />
                      {caseItem.patient}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Assigned to:</span> {caseItem.assignee}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Due: {caseItem.dueDate}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Created {caseItem.createdDate}
                    </div>
                    <Button className="w-full mt-4" variant="outline" onClick={() => navigate(`/cases/${caseItem.id}`)}>View Case</Button>
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
