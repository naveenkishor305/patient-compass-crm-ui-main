
import { useState } from "react";
import { BackNavigationHeader } from "@/components/navigation/BackNavigationHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Search, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDepartmentBadge } from "@/components/case/CaseUtils";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RoleGuard } from "@/components/auth/RoleGuard";

// Sample doctor data
const doctors = [
  {
    id: "1",
    name: "Dr. Michael Chen",
    specialization: "Cardiologist",
    department: "Cardiology",
    email: "m.chen@hospital.com",
    phone: "+1 (555) 123-4567",
    status: "Active",
  },
  {
    id: "2",
    name: "Dr. Sarah Williams",
    specialization: "Neurologist",
    department: "Neurology",
    email: "s.williams@hospital.com",
    phone: "+1 (555) 987-6543",
    status: "Active",
  },
  {
    id: "3",
    name: "Dr. David Rodriguez",
    specialization: "Pediatrician",
    department: "Pediatrics",
    email: "d.rodriguez@hospital.com",
    phone: "+1 (555) 234-5678",
    status: "Inactive",
  },
  {
    id: "4",
    name: "Dr. Emily Johnson",
    specialization: "Oncologist",
    department: "Oncology",
    email: "e.johnson@hospital.com",
    phone: "+1 (555) 345-6789",
    status: "Active",
  },
  {
    id: "5",
    name: "Dr. Robert Thompson",
    specialization: "Surgeon",
    department: "Surgery",
    email: "r.thompson@hospital.com",
    phone: "+1 (555) 456-7890",
    status: "Active",
  },
];

const AddDoctorDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add Doctor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Doctor</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="First Name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Last Name" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="specialization">Specialization</Label>
            <Input id="specialization" placeholder="Specialization" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select>
              <SelectTrigger id="department">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cardiology">Cardiology</SelectItem>
                <SelectItem value="neurology">Neurology</SelectItem>
                <SelectItem value="oncology">Oncology</SelectItem>
                <SelectItem value="pediatrics">Pediatrics</SelectItem>
                <SelectItem value="surgery">Surgery</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="doctor@hospital.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="+1 (555) 123-4567" />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">Add Doctor</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function DoctorManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <RoleGuard allowedRoles="admin" fallback={<div>You do not have permission to access this page.</div>}>
      <div className="p-6">
        <BackNavigationHeader title="Doctor Management" />
        <div className="flex justify-between items-center mt-6">
          <div>
            <h1 className="text-3xl font-bold">Doctor Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage doctor profiles and privileges
            </p>
          </div>
          <AddDoctorDialog />
        </div>

        <div className="mt-6 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search doctors..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-6 rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell className="font-medium">{doctor.name}</TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>{getDepartmentBadge(doctor.department)}</TableCell>
                  <TableCell>{doctor.email}</TableCell>
                  <TableCell>{doctor.phone}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        doctor.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {doctor.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </RoleGuard>
  );
}
