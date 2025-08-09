
import { useState } from "react";
import { Search, UserCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types/user";
import { roleDescriptions } from "@/docs/RoleDescriptions";

// Mock conversation data
const mockConversations = [
  {
    id: "c1",
    user: {
      id: "u2",
      name: "Dr. Michael Chen",
      role: "doctor" as UserRole,
      position: "Cardiologist",
      avatar: "",
    },
    lastMessage: {
      text: "Patient follow-up required for case #1234",
      timestamp: "10:30 AM",
      isUnread: true,
    },
  },
  {
    id: "c2",
    user: {
      id: "u5",
      name: "Alex Thompson",
      role: "crm_user" as UserRole,
      position: "Case Manager",
      avatar: "",
    },
    lastMessage: {
      text: "I've assigned the new patient case to you",
      timestamp: "Yesterday",
      isUnread: false,
    },
  },
  {
    id: "c3",
    user: {
      id: "u6",
      name: "Maria Rodriguez",
      role: "doctor" as UserRole,
      position: "Pediatrician",
      avatar: "",
    },
    lastMessage: {
      text: "The lab results are ready for review",
      timestamp: "Yesterday",
      isUnread: true,
    },
  },
  {
    id: "c4",
    user: {
      id: "u7",
      name: "James Wilson",
      role: "admin" as UserRole,
      position: "System Administrator",
      avatar: "",
    },
    lastMessage: {
      text: "New system update scheduled for next week",
      timestamp: "May 3",
      isUnread: false,
    },
  },
];

interface ConversationListProps {
  onSelectUser: (user: any) => void;
}

export function ConversationList({ onSelectUser }: ConversationListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = mockConversations.filter(conversation => 
    !searchQuery || 
    conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get badge color based on role
  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "admin": return "bg-red-100 text-red-800";
      case "crm_user": return "bg-blue-100 text-blue-800";
      case "doctor": return "bg-green-100 text-green-800";
      case "marketing": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search conversations..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="border rounded-md overflow-hidden">
        {filteredConversations.length > 0 ? (
          <div className="divide-y">
            {filteredConversations.map((conversation) => (
              <div 
                key={conversation.id}
                className={`p-4 hover:bg-muted/50 cursor-pointer transition-colors ${
                  conversation.lastMessage.isUnread ? "bg-muted/20" : ""
                }`}
                onClick={() => onSelectUser(conversation.user)}
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted-foreground/20 flex items-center justify-center relative">
                    <UserCircle className="h-6 w-6 text-muted-foreground" />
                    {conversation.lastMessage.isUnread && (
                      <div className="absolute -top-1 -right-1 h-3 w-3 bg-healthcare-primary rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className={`font-medium truncate ${conversation.lastMessage.isUnread ? "font-semibold" : ""}`}>
                        {conversation.user.name}
                      </h4>
                      <span className="text-xs text-muted-foreground">{conversation.lastMessage.timestamp}</span>
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage.text}
                    </div>
                    <div className="mt-1">
                      <Badge 
                        variant="outline" 
                        className={getRoleBadgeColor(conversation.user.role)}
                      >
                        {roleDescriptions[conversation.user.role].title}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No conversations match your search</p>
          </div>
        )}
      </div>
    </div>
  );
}
