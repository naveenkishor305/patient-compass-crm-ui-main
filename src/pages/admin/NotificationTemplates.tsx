
import { useState } from "react";
import { BackNavigationHeader } from "@/components/navigation/BackNavigationHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Filter, MessageSquare, Mail, Phone } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RoleGuard } from "@/components/auth/RoleGuard";

// Sample template data
const templates = [
  {
    id: "1",
    name: "Appointment Confirmation",
    type: "SMS",
    lastModified: "2023-06-15",
    status: "Active",
  },
  {
    id: "2",
    name: "Appointment Reminder",
    type: "Email",
    lastModified: "2023-06-20",
    status: "Active",
  },
  {
    id: "3",
    name: "Feedback Request",
    type: "WhatsApp",
    lastModified: "2023-07-01",
    status: "Active",
  },
  {
    id: "4",
    name: "Test Results Available",
    type: "SMS",
    lastModified: "2023-07-05",
    status: "Active",
  },
  {
    id: "5",
    name: "Medication Reminder",
    type: "Email",
    lastModified: "2023-07-10",
    status: "Inactive",
  },
];

const getChannelIcon = (type: string) => {
  switch (type) {
    case "SMS":
      return <Phone className="h-4 w-4 text-blue-500" />;
    case "Email":
      return <Mail className="h-4 w-4 text-green-500" />;
    case "WhatsApp":
      return <MessageSquare className="h-4 w-4 text-purple-500" />;
    default:
      return <MessageSquare className="h-4 w-4" />;
  }
};

const AddTemplateDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Add Template
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Notification Template</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="sms" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sms">SMS</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          </TabsList>
          <TabsContent value="sms" className="mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="templateName">Template Name</Label>
                <Input id="templateName" placeholder="Template Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smsContent">Message Content</Label>
                <Textarea
                  id="smsContent"
                  placeholder="Enter your message here..."
                  className="min-h-[120px]"
                />
              </div>
              <div className="space-y-2">
                <Label>Variables</Label>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => {}}>
                    {"{patient_name}"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {}}>
                    {"{appointment_date}"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {}}>
                    {"{appointment_time}"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {}}>
                    {"{doctor_name}"}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="email" className="mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailTemplateName">Template Name</Label>
                <Input id="emailTemplateName" placeholder="Template Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailSubject">Subject</Label>
                <Input id="emailSubject" placeholder="Email Subject" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailContent">Email Body</Label>
                <Textarea
                  id="emailContent"
                  placeholder="Enter your email content here..."
                  className="min-h-[200px]"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="whatsapp" className="mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="whatsappTemplateName">Template Name</Label>
                <Input id="whatsappTemplateName" placeholder="Template Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsappContent">Message Content</Label>
                <Textarea
                  id="whatsappContent"
                  placeholder="Enter your message here..."
                  className="min-h-[120px]"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" type="button">
            Cancel
          </Button>
          <Button type="submit">Save Template</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function NotificationTemplates() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <RoleGuard allowedRoles="admin" fallback={<div>You do not have permission to access this page.</div>}>
      <div className="p-6">
        <BackNavigationHeader title="Notification Templates" />
        <div className="flex justify-between items-center mt-6">
          <div>
            <h1 className="text-3xl font-bold">Notification Templates</h1>
            <p className="text-muted-foreground mt-2">
              Manage notification templates and delivery
            </p>
          </div>
          <AddTemplateDialog />
        </div>

        <div className="mt-6 flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
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
                <TableHead>Template Name</TableHead>
                <TableHead>Channel Type</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.id}>
                  <TableCell className="font-medium">{template.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getChannelIcon(template.type)}
                      {template.type}
                    </div>
                  </TableCell>
                  <TableCell>{template.lastModified}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        template.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {template.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Preview
                      </Button>
                    </div>
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
