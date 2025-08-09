import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BellIcon,
  MessageCircle,
  Search,
  User,
  Minimize2,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/contexts/UserContext";
import { MessageDialog } from "@/components/messaging/MessageDialog";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "@/components/ui/sidebar";

export function TopBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);
  const { currentUser, switchUser } = useUser();
  const { toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleOpenMessageDialog = (recipient: any) => {
    setSelectedRecipient(recipient);
    setMessageDialogOpen(true);
  };

  const handleViewAllMessages = () => {
    navigate("/messages");
  };

  // Mock users for switching
  const availableUsers = [
    { id: "admin", name: "Admin User", role: "admin" },
    { id: "crm", name: "Dr. Jane Smith", role: "crm_user" },
    { id: "doctor", name: "Dr. Michael Chen", role: "doctor" },
    { id: "marketing", name: "Sarah Williams", role: "marketing" },
  ];

  // Mock recipients for quick messaging
  const recentContacts = [
    {
      id: "dr-chen",
      name: "Dr. Robert Chen",
      role: "doctor" as const,
      position: "Cardiologist",
      lastMessage: "Patient follow-up required for case #1234",
      timestamp: "10 minutes ago"
    },
    {
      id: "nurse-wilson",
      name: "Nurse Wilson",
      role: "crm_user" as const,
      position: "Head Nurse",
      lastMessage: "Updated lab results for patient Maria Garcia",
      timestamp: "2 hours ago"
    }
  ];

  return (
    <div className="h-16 border-b bg-white flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Minimize2 className="h-5 w-5" />
        </Button>

        <form onSubmit={handleSearch} className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search patients, cases, or tasks..."
            className="pl-10 w-full h-9 bg-white border-gray-200 focus-visible:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </div>

      <div className="flex items-center space-x-4">
        {/* User Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              {currentUser.name}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <div className="p-2 font-medium">Switch User</div>
            <DropdownMenuSeparator />
            {availableUsers.map(user => (
              <DropdownMenuItem 
                key={user.id}
                className="cursor-pointer"
                onClick={() => switchUser(user.id)}
              >
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">{user.role.replace('_', ' ')}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Messages Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <MessageCircle className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-healthcare-primary text-xs text-white">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-2 font-medium">Messages</div>
            <DropdownMenuSeparator />
            {recentContacts.map(contact => (
              <DropdownMenuItem 
                key={contact.id}
                className="p-3 cursor-pointer"
                onClick={() => handleOpenMessageDialog(contact)}
              >
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {contact.lastMessage}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{contact.timestamp}
                  </p>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div>
                <p className="font-medium">System Notification</p>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  Case #5678 escalated due to SLA breach
                </p>
                <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              className="text-center text-sm font-medium text-healthcare-primary cursor-pointer"
              onClick={handleViewAllMessages}
            >
              View All Messages
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <BellIcon className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-healthcare-danger text-xs text-white">
                5
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-2 font-medium">Notifications</div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="bg-healthcare-warning text-white mt-0.5">SLA</Badge>
                <div>
                  <p className="font-medium">SLA Warning</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    Case #2468 approaching SLA breach (30 min remaining)
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Just now</p>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="bg-healthcare-primary text-white mt-0.5">Task</Badge>
                <div>
                  <p className="font-medium">New Task Assigned</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    Call patient John Doe for medication follow-up
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">30 minutes ago</p>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="bg-healthcare-danger text-white mt-0.5">Alert</Badge>
                <div>
                  <p className="font-medium">High-Risk Patient Alert</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    Sarah Williams has been flagged as high-risk
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="bg-green-600 text-white mt-0.5">Case</Badge>
                <div>
                  <p className="font-medium">Case Resolved</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    Case #3579 has been successfully resolved
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">3 hours ago</p>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-sm font-medium text-healthcare-primary cursor-pointer">
              View All Notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Message Dialog */}
      {selectedRecipient && (
        <MessageDialog
          open={messageDialogOpen}
          onOpenChange={setMessageDialogOpen}
          currentUser={currentUser}
          recipient={selectedRecipient}
        />
      )}
    </div>
  );
}
