
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Package, 
  Pill, 
  User, 
  Bell, 
  Search, 
  Plus, 
  Filter,
  AlertTriangle,
  Clock,
  CheckCircle,
  Edit,
  Trash2,
  Eye,
  FileText,
  Calendar
} from "lucide-react";

// Mock data for demonstration
const mockDrugs = [
  {
    id: "1",
    name: "Paracetamol",
    genericName: "Acetaminophen",
    strength: "500mg",
    form: "tablet" as const,
    currentStock: 50,
    reorderLevel: 100,
    expiryDate: "2024-12-31",
    location: "A-1-5",
    status: "low-stock" as const
  },
  {
    id: "2", 
    name: "Amoxicillin",
    genericName: "Amoxicillin",
    strength: "250mg",
    form: "capsule" as const,
    currentStock: 200,
    reorderLevel: 50,
    expiryDate: "2025-06-15",
    location: "B-2-3",
    status: "in-stock" as const
  }
];

const mockPrescriptions = [
  {
    id: "RX001",
    patientName: "John Doe",
    patientMRN: "MRN123456",
    doctorName: "Dr. Smith",
    dateOrdered: "2024-01-15",
    status: "new" as const,
    medications: [
      {
        drugName: "Paracetamol",
        strength: "500mg",
        dosage: "1 tablet",
        frequency: "Every 6 hours",
        quantityOrdered: 20
      }
    ]
  },
  {
    id: "RX002", 
    patientName: "Jane Smith",
    patientMRN: "MRN789012",
    doctorName: "Dr. Wilson",
    dateOrdered: "2024-01-14",
    status: "ready-for-pickup" as const,
    medications: [
      {
        drugName: "Amoxicillin",
        strength: "250mg", 
        dosage: "1 capsule",
        frequency: "Twice daily",
        quantityOrdered: 14
      }
    ]
  }
];

const mockAlerts = [
  {
    id: "1",
    type: "low-stock" as const,
    title: "Low Stock Alert",
    message: "Paracetamol 500mg is running low (50 units remaining)",
    dateTime: "2024-01-15 09:30",
    status: "new" as const,
    priority: "high" as const
  },
  {
    id: "2",
    type: "expired-drug" as const, 
    title: "Expiring Soon",
    message: "Aspirin 100mg will expire in 7 days",
    dateTime: "2024-01-15 08:15",
    status: "acknowledged" as const,
    priority: "medium" as const
  }
];

export default function PharmacyManagement() {
  const [activeTab, setActiveTab] = useState("inventory");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrescription, setSelectedPrescription] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    const variants = {
      "in-stock": "default",
      "low-stock": "destructive", 
      "expired": "destructive",
      "out-of-stock": "destructive",
      "new": "default",
      "in-progress": "secondary",
      "ready-for-pickup": "default",
      "completed": "default",
      "dispensed": "default"
    } as const;
    
    return <Badge variant={variants[status as keyof typeof variants] || "default"}>{status.replace("-", " ")}</Badge>;
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "critical":
      case "high":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "medium":
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pharmacy Management System</h1>
          <p className="text-muted-foreground">
            Manage inventory, dispense prescriptions, and track patient medication history
          </p>
        </div>
      </div>

      {/* Main Content with Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Inventory Management
          </TabsTrigger>
          <TabsTrigger value="dispensing" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            Prescription Dispensing
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Patient History
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Alerts & Notifications
          </TabsTrigger>
        </TabsList>

        {/* Inventory Management Tab */}
        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Drug Inventory</CardTitle>
                  <CardDescription>Manage drug stock and inventory details</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Drug
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search by drug name, strength, manufacturer..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              <div className="space-y-4">
                {mockDrugs.map((drug) => (
                  <div key={drug.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1 grid grid-cols-6 gap-4">
                      <div>
                        <div className="font-medium">{drug.name}</div>
                        <div className="text-sm text-muted-foreground">{drug.genericName}</div>
                      </div>
                      <div>
                        <div className="text-sm">{drug.strength}</div>
                        <div className="text-xs text-muted-foreground">{drug.form}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">{drug.currentStock} units</div>
                        <div className="text-xs text-muted-foreground">Reorder: {drug.reorderLevel}</div>
                      </div>
                      <div>
                        <div className="text-sm">{drug.expiryDate}</div>
                        <div className="text-xs text-muted-foreground">{drug.location}</div>
                      </div>
                      <div>
                        {getStatusBadge(drug.status)}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prescription Dispensing Tab */}
        <TabsContent value="dispensing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Prescription Queue</CardTitle>
              <CardDescription>Process and dispense electronic prescriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search by patient name, prescription ID, doctor..."
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Status Filter
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Prescription List */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Pending Prescriptions</h3>
                  {mockPrescriptions.map((prescription) => (
                    <div 
                      key={prescription.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedPrescription === prescription.id ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedPrescription(prescription.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-medium">{prescription.patientName}</div>
                          <div className="text-sm text-muted-foreground">MRN: {prescription.patientMRN}</div>
                        </div>
                        {getStatusBadge(prescription.status)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <div>RX: {prescription.id}</div>
                        <div>Doctor: {prescription.doctorName}</div>
                        <div>Date: {prescription.dateOrdered}</div>
                      </div>
                      <div className="mt-2">
                        <div className="text-sm">
                          {prescription.medications[0].drugName} {prescription.medications[0].strength}
                          {prescription.medications.length > 1 && ` +${prescription.medications.length - 1} more`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dispensing Details */}
                <div>
                  {selectedPrescription ? (
                    <Card>
                      <CardHeader>
                        <CardTitle>Dispense Prescription</CardTitle>
                        <CardDescription>RX: {selectedPrescription}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium">Patient</Label>
                            <div className="text-sm">John Doe (MRN: MRN123456)</div>
                            <div className="text-xs text-red-600">Allergies: Penicillin</div>
                          </div>
                          <div>
                            <Label className="text-sm font-medium">Doctor</Label>
                            <div className="text-sm">Dr. Smith</div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-sm font-medium">Medications to Dispense</Label>
                          <div className="border rounded-lg p-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium">Paracetamol 500mg</div>
                                <div className="text-sm text-muted-foreground">
                                  1 tablet, Every 6 hours, Quantity: 20
                                </div>
                                <div className="text-xs text-green-600">Stock available: 50 units</div>
                              </div>
                              <Input 
                                placeholder="Qty to dispense" 
                                className="w-24"
                                defaultValue="20"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="instructions" className="text-sm font-medium">Patient Instructions</Label>
                          <Input 
                            id="instructions"
                            placeholder="Additional instructions for patient..."
                            className="mt-1"
                          />
                        </div>

                        <Alert>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>No Drug Interactions Detected</AlertTitle>
                          <AlertDescription>
                            This medication is safe to dispense for this patient.
                          </AlertDescription>
                        </Alert>

                        <div className="flex gap-2">
                          <Button className="flex-1">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Dispense Medication
                          </Button>
                          <Button variant="outline">
                            <FileText className="h-4 w-4 mr-2" />
                            Print Label
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="flex items-center justify-center h-64 text-muted-foreground">
                        Select a prescription to begin dispensing
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Patient History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Patient Medication History</CardTitle>
              <CardDescription>View comprehensive medication records for patients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="patient-search">Search Patient</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="patient-search"
                      placeholder="Enter patient name or MRN..."
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="text-center py-8 text-muted-foreground">
                    Search for a patient to view their medication history
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts & Notifications Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pharmacy Alerts & Notifications</CardTitle>
              <CardDescription>Manage system-generated alerts and warnings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <Button variant="outline" size="sm">All Alerts</Button>
                <Button variant="outline" size="sm">New</Button>
                <Button variant="outline" size="sm">Acknowledged</Button>
                <Button variant="outline" size="sm">Critical</Button>
              </div>

              <div className="space-y-4">
                {mockAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      {getPriorityIcon(alert.priority)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{alert.title}</span>
                          {getStatusBadge(alert.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.dateTime}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Acknowledge</Button>
                      <Button size="sm" variant="outline">Resolve</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
