
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Mail, 
  MailOpen, 
  Plus, 
  Search, 
  Star, 
  Archive, 
  Trash2, 
  Reply, 
  Forward, 
  Paperclip,
  Send,
  Inbox,
  Edit,
  FileText
} from "lucide-react";
import { useState } from "react";

interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  date: string;
  isRead: boolean;
  isStarred: boolean;
  attachments?: string[];
  priority?: "high" | "normal" | "low";
}

export default function Email() {
  const [selectedFolder, setSelectedFolder] = useState<"inbox" | "sent" | "drafts">("inbox");
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isComposing, setIsComposing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock email data
  const emails: Email[] = [
    {
      id: "1",
      from: "dr.smith@hospital.com",
      to: "nurse.johnson@hospital.com",
      subject: "Patient Update - John Doe",
      body: "Please review the latest lab results for John Doe. The values show improvement since last week.",
      date: "2024-01-15 10:30",
      isRead: false,
      isStarred: true,
      priority: "high"
    },
    {
      id: "2",
      from: "admin@hospital.com",
      to: "all-staff@hospital.com",
      subject: "System Maintenance Schedule",
      body: "The EHR system will be undergoing maintenance this weekend from 2 AM to 6 AM.",
      date: "2024-01-14 14:20",
      isRead: true,
      isStarred: false,
      priority: "normal"
    },
    {
      id: "3",
      from: "pharmacy@hospital.com",
      to: "dr.wilson@hospital.com",
      subject: "Medication Stock Alert",
      body: "We are running low on several critical medications. Please see attached list.",
      date: "2024-01-14 09:15",
      isRead: true,
      isStarred: false,
      attachments: ["medication-list.pdf"],
      priority: "high"
    }
  ];

  const filteredEmails = emails.filter(email => 
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "low":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  const ComposeEmail = () => (
    <Card>
      <CardHeader>
        <CardTitle>Compose Email</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="to">To</Label>
          <Input id="to" placeholder="recipient@hospital.com" />
        </div>
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="Enter subject" />
        </div>
        <div>
          <Label htmlFor="body">Message</Label>
          <Textarea id="body" placeholder="Type your message here..." rows={10} />
        </div>
        <div className="flex justify-between">
          <Button variant="outline">
            <Paperclip className="h-4 w-4 mr-2" />
            Attach File
          </Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setIsComposing(false)}>
              Cancel
            </Button>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const EmailDetail = ({ email }: { email: Email }) => (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{email.subject}</CardTitle>
            <div className="text-sm text-muted-foreground mt-1">
              From: {email.from} • {email.date}
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Reply className="h-4 w-4 mr-1" />
              Reply
            </Button>
            <Button size="sm" variant="outline">
              <Forward className="h-4 w-4 mr-1" />
              Forward
            </Button>
            <Button size="sm" variant="outline">
              <Star className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="whitespace-pre-wrap">{email.body}</div>
        {email.attachments && email.attachments.length > 0 && (
          <div className="mt-4">
            <Label>Attachments:</Label>
            <div className="flex gap-2 mt-2">
              {email.attachments.map((attachment, index) => (
                <Badge key={index} variant="outline" className="cursor-pointer">
                  <Paperclip className="h-3 w-3 mr-1" />
                  {attachment}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Email</h1>
          <p className="text-muted-foreground">
            Manage your hospital communication
          </p>
        </div>
        <Button onClick={() => setIsComposing(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Compose
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-3">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <Button
                  variant={selectedFolder === "inbox" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedFolder("inbox")}
                >
                  <Inbox className="h-4 w-4 mr-2" />
                  Inbox
                  <Badge variant="secondary" className="ml-auto">3</Badge>
                </Button>
                <Button
                  variant={selectedFolder === "sent" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedFolder("sent")}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Sent
                </Button>
                <Button
                  variant={selectedFolder === "drafts" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedFolder("drafts")}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Drafts
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          {isComposing ? (
            <ComposeEmail />
          ) : selectedEmail ? (
            <div className="space-y-4">
              <Button
                variant="outline"
                onClick={() => setSelectedEmail(null)}
              >
                ← Back to {selectedFolder}
              </Button>
              <EmailDetail email={selectedEmail} />
            </div>
          ) : (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="capitalize">{selectedFolder}</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search emails..."
                        className="pl-10 w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="space-y-2">
                    {filteredEmails.map((email) => (
                      <div
                        key={email.id}
                        className={`p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                          !email.isRead ? "bg-blue-50 border-blue-200" : ""
                        }`}
                        onClick={() => setSelectedEmail(email)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            {email.isRead ? (
                              <MailOpen className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <Mail className="h-4 w-4 text-blue-600" />
                            )}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className={`font-medium ${!email.isRead ? "text-blue-900" : ""}`}>
                                  {email.from}
                                </span>
                                {email.priority === "high" && (
                                  <Badge variant="destructive" className="text-xs">High</Badge>
                                )}
                                {email.attachments && (
                                  <Paperclip className="h-3 w-3 text-muted-foreground" />
                                )}
                              </div>
                              <p className={`text-sm truncate ${!email.isRead ? "font-medium" : "text-muted-foreground"}`}>
                                {email.subject}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {email.body}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {email.date.split(' ')[1]}
                            </span>
                            {email.isStarred && (
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
