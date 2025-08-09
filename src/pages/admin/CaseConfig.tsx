
import { useState } from "react";
import { BackNavigationHeader } from "@/components/navigation/BackNavigationHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Filter } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getStatusBadge, getPriorityBadge } from "@/components/case/CaseUtils";
import { RoleGuard } from "@/components/auth/RoleGuard";

// Sample case types data
const caseTypes = [
  {
    id: "1",
    name: "General Inquiry",
    description: "General questions about services, policies, etc.",
    defaultPriority: "low",
  },
  {
    id: "2",
    name: "Billing Issue",
    description: "Issues related to billing, payments, or insurance",
    defaultPriority: "medium",
  },
  {
    id: "3",
    name: "Appointment Request",
    description: "Requests for scheduling, rescheduling, or canceling appointments",
    defaultPriority: "medium",
  },
  {
    id: "4",
    name: "Complaint",
    description: "Patient complaints about services, staff, facilities, etc.",
    defaultPriority: "high",
  },
  {
    id: "5",
    name: "Medical Record Request",
    description: "Requests for access to medical records",
    defaultPriority: "medium",
  },
];

// Sample case statuses data
const caseStatuses = [
  {
    id: "1",
    name: "Open",
    description: "Case has been created but not yet assigned",
    isDefault: true,
  },
  {
    id: "2",
    name: "In Progress",
    description: "Case has been assigned and is being worked on",
    isDefault: false,
  },
  {
    id: "3",
    name: "Pending",
    description: "Case is waiting for external input or action",
    isDefault: false,
  },
  {
    id: "4",
    name: "Resolved",
    description: "Case has been successfully resolved",
    isDefault: false,
  },
  {
    id: "5",
    name: "Closed",
    description: "Case has been closed without resolution",
    isDefault: false,
  },
];

// Sample case priorities data
const casePriorities = [
  {
    id: "1",
    name: "Low",
    description: "Standard issues that can be resolved within the normal SLA",
    value: "low",
  },
  {
    id: "2",
    name: "Medium",
    description: "Important issues that need attention but are not critical",
    value: "medium",
  },
  {
    id: "3",
    name: "High",
    description: "Critical issues that require immediate attention",
    value: "high",
  },
];

const AddCaseTypeDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Case Type
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Case Type</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="typeName">Case Type Name</Label>
            <Input id="typeName" placeholder="Case Type Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" placeholder="Case Type Description" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="defaultPriority">Default Priority</Label>
            <Select>
              <SelectTrigger id="defaultPriority">
                <SelectValue placeholder="Select default priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AddCaseStatusDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Case Status
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Case Status</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="statusName">Status Name</Label>
            <Input id="statusName" placeholder="Status Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="statusDescription">Description</Label>
            <Input id="statusDescription" placeholder="Status Description" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="isDefault" className="rounded border-gray-300" />
            <Label htmlFor="isDefault">Set as default status for new cases</Label>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AddCasePriorityDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Priority
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Priority Level</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="priorityName">Priority Name</Label>
            <Input id="priorityName" placeholder="Priority Name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priorityDescription">Description</Label>
            <Input id="priorityDescription" placeholder="Priority Description" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="priorityValue">Priority Value</Label>
            <Input id="priorityValue" placeholder="Priority Value (e.g., low, medium, high)" />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function CaseConfig() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("types");

  return (
    <RoleGuard allowedRoles="admin" fallback={<div>You do not have permission to access this page.</div>}>
      <div className="p-6">
        <BackNavigationHeader title="Case Configuration" />
        <div className="flex justify-between items-center mt-6">
          <div>
            <h1 className="text-3xl font-bold">Case Configuration</h1>
            <p className="text-muted-foreground mt-2">
              Manage case types, statuses, and priorities
            </p>
          </div>
        </div>

        <Tabs defaultValue="types" className="mt-6" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="types">Case Types</TabsTrigger>
            <TabsTrigger value="statuses">Case Statuses</TabsTrigger>
            <TabsTrigger value="priorities">Priorities</TabsTrigger>
          </TabsList>

          <div className="flex justify-between items-center mt-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${activeTab}...`}
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {activeTab === "types" && <AddCaseTypeDialog />}
            {activeTab === "statuses" && <AddCaseStatusDialog />}
            {activeTab === "priorities" && <AddCasePriorityDialog />}
          </div>

          <TabsContent value="types" className="mt-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Default Priority</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {caseTypes.map((type) => (
                    <TableRow key={type.id}>
                      <TableCell className="font-medium">{type.name}</TableCell>
                      <TableCell>{type.description}</TableCell>
                      <TableCell>{getPriorityBadge(type.defaultPriority)}</TableCell>
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
          </TabsContent>

          <TabsContent value="statuses" className="mt-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Default</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {caseStatuses.map((status) => (
                    <TableRow key={status.id}>
                      <TableCell className="font-medium">
                        {getStatusBadge(status.name.toLowerCase().replace(" ", "-"))}
                      </TableCell>
                      <TableCell>{status.description}</TableCell>
                      <TableCell>
                        {status.isDefault ? (
                          <span className="text-green-500">Default</span>
                        ) : (
                          "-"
                        )}
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
          </TabsContent>

          <TabsContent value="priorities" className="mt-6">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Priority Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Priority Level</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {casePriorities.map((priority) => (
                    <TableRow key={priority.id}>
                      <TableCell className="font-medium">{priority.name}</TableCell>
                      <TableCell>{priority.description}</TableCell>
                      <TableCell>{getPriorityBadge(priority.value)}</TableCell>
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
          </TabsContent>
        </Tabs>
      </div>
    </RoleGuard>
  );
}
