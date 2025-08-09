
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RoleGuard } from "@/components/auth/RoleGuard";

// Sample team data
const teams = [
  {
    id: "1",
    name: "Cardiac Emergency Response",
    department: "Cardiology",
    leadDoctor: "Dr. Michael Chen",
    members: 5,
    status: "Active",
  },
  {
    id: "2",
    name: "Neuro ICU Team",
    department: "Neurology",
    leadDoctor: "Dr. Sarah Williams",
    members: 4,
    status: "Active",
  },
  {
    id: "3",
    name: "Pediatric Emergency",
    department: "Pediatrics",
    leadDoctor: "Dr. David Rodriguez",
    members: 7,
    status: "Active",
  },
  {
    id: "4",
    name: "Cancer Care Unit",
    department: "Oncology",
    leadDoctor: "Dr. Emily Johnson",
    members: 6,
    status: "Inactive",
  },
  {
    id: "5",
    name: "Surgical Response Team",
    department: "Surgery",
    leadDoctor: "Dr. Robert Thompson",
    members: 8,
    status: "Active",
  },
];

const AddTeamDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add Team
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="teamName">Team Name</Label>
            <Input id="teamName" placeholder="Team Name" />
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
            <Label htmlFor="leadDoctor">Lead Doctor</Label>
            <Select>
              <SelectTrigger id="leadDoctor">
                <SelectValue placeholder="Select lead doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dr-chen">Dr. Michael Chen</SelectItem>
                <SelectItem value="dr-williams">Dr. Sarah Williams</SelectItem>
                <SelectItem value="dr-rodriguez">Dr. David Rodriguez</SelectItem>
                <SelectItem value="dr-johnson">Dr. Emily Johnson</SelectItem>
                <SelectItem value="dr-thompson">Dr. Robert Thompson</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="members">Team Members</Label>
            <Select>
              <SelectTrigger id="members">
                <SelectValue placeholder="Add team members" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dr-chen">Dr. Michael Chen</SelectItem>
                <SelectItem value="dr-williams">Dr. Sarah Williams</SelectItem>
                <SelectItem value="dr-rodriguez">Dr. David Rodriguez</SelectItem>
                <SelectItem value="dr-johnson">Dr. Emily Johnson</SelectItem>
                <SelectItem value="dr-thompson">Dr. Robert Thompson</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">Create Team</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function TeamManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <RoleGuard allowedRoles="admin" fallback={<div>You do not have permission to access this page.</div>}>
      <div className="p-6">
        <BackNavigationHeader title="Team Management" />
        <div className="flex justify-between items-center mt-6">
          <div>
            <h1 className="text-3xl font-bold">Team Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage emergency response teams
            </p>
          </div>
          <AddTeamDialog />
        </div>

        <div className="mt-6 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search teams..."
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
                <TableHead>Team Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Lead Doctor</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teams.map((team) => (
                <TableRow key={team.id}>
                  <TableCell className="font-medium">{team.name}</TableCell>
                  <TableCell>{team.department}</TableCell>
                  <TableCell>{team.leadDoctor}</TableCell>
                  <TableCell>{team.members}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        team.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {team.status}
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
