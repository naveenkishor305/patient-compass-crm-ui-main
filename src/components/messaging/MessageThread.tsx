
import { useState, useRef, useEffect } from "react";
import { SendHorizonal, PaperclipIcon, SmileIcon, UserCircle, ScrollIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, UserRole } from "@/types/user";
import { useToast } from "@/components/ui/use-toast";
import { roleDescriptions } from "@/docs/RoleDescriptions";
import { ScrollArea } from "@/components/ui/scroll-area";

// Message structure
interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: string;
  attachments?: { name: string; url: string }[];
}

interface MessageThreadProps {
  currentUser: User;
  recipient: {
    id: string;
    name: string;
    role: UserRole;
    position: string;
    avatar?: string;
  };
}

export function MessageThread({ currentUser, recipient }: MessageThreadProps) {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I help you today?",
      timestamp: new Date(new Date().getTime() - 60 * 60000), // 1 hour ago
      sender: recipient.id,
    },
    {
      id: "2",
      text: "I have a question about a patient case.",
      timestamp: new Date(new Date().getTime() - 45 * 60000), // 45 min ago
      sender: currentUser.id,
    },
    {
      id: "3",
      text: "Of course. Can you provide the case number or patient details?",
      timestamp: new Date(new Date().getTime() - 30 * 60000), // 30 min ago
      sender: recipient.id,
    },
    {
      id: "4",
      text: "It's case #CSE-1234 for patient Sarah Johnson. We need to discuss the follow-up plan.",
      timestamp: new Date(new Date().getTime() - 15 * 60000), // 15 min ago
      sender: currentUser.id,
    },
  ]);
  
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // Add the new message
    const newMessage: Message = {
      id: `msg-${new Date().getTime()}`,
      text: messageText,
      timestamp: new Date(),
      sender: currentUser.id,
    };
    
    setMessages([...messages, newMessage]);
    setMessageText(""); // Clear input
    
    // Show toast confirmation
    toast({
      title: "Message Sent",
      description: `Message sent to ${recipient.name}`,
    });
  };
  
  const formatMessageTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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
    <div className="border rounded-lg h-[500px] flex flex-col bg-white">
      {/* Header */}
      <div className="border-b p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-muted-foreground/20 flex items-center justify-center">
            <UserCircle className="h-6 w-6 text-muted-foreground" />
          </div>
          <div>
            <h3 className="font-medium">{recipient.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{recipient.position}</span>
              <Badge 
                variant="outline" 
                className={getRoleBadgeColor(recipient.role)}
              >
                {roleDescriptions[recipient.role].title}
              </Badge>
            </div>
          </div>
        </div>
        
        <div>
          <Button variant="ghost" size="sm">View Profile</Button>
        </div>
      </div>
      
      {/* Messages */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {messages.map((message) => {
            const isCurrentUser = message.sender === currentUser.id;
            
            return (
              <div 
                key={message.id}
                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    isCurrentUser 
                      ? "bg-healthcare-primary text-white" 
                      : "bg-gray-100"
                  }`}
                >
                  <div className="text-sm">{message.text}</div>
                  <div 
                    className={`text-xs mt-1 ${
                      isCurrentUser ? "text-white/80" : "text-muted-foreground"
                    }`}
                  >
                    {formatMessageTime(message.timestamp)}
                  </div>
                  
                  {message.attachments && (
                    <div className="mt-2 space-y-1">
                      {message.attachments.map((file, i) => (
                        <div 
                          key={i}
                          className={`text-xs flex items-center gap-1 p-1 rounded ${
                            isCurrentUser ? "bg-white/20" : "bg-white"
                          }`}
                        >
                          <PaperclipIcon className="h-3 w-3" />
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Message input */}
      <div className="border-t p-3">
        <div className="flex gap-2">
          <Textarea
            placeholder="Type a message..."
            className="resize-none min-h-[60px]"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <div className="flex flex-col gap-2">
            <Button 
              size="icon" 
              variant="outline"
              className="h-8 w-8"
            >
              <PaperclipIcon className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="outline"
              className="h-8 w-8"
            >
              <SmileIcon className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              className="h-12 w-8 bg-healthcare-primary hover:bg-healthcare-dark"
              onClick={handleSendMessage}
            >
              <SendHorizonal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
