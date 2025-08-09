
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Phone, Mail, Video } from "lucide-react";

export const RecentCommunications = () => {
  const communications = [
    {
      id: "c1",
      patient: "Sarah Johnson",
      type: "phone",
      subject: "Follow-up consultation",
      time: "2 hours ago",
      status: "completed",
      priority: "high"
    },
    {
      id: "c2",
      patient: "Michael Chen",
      type: "email",
      subject: "Lab results discussion",
      time: "4 hours ago",
      status: "pending",
      priority: "medium"
    },
    {
      id: "c3",
      patient: "Emma Davis",
      type: "video",
      subject: "Telemedicine appointment",
      time: "1 day ago",
      status: "completed",
      priority: "low"
    },
    {
      id: "c4",
      patient: "Robert Wilson",
      type: "message",
      subject: "Prescription renewal",
      time: "2 days ago",
      status: "completed",
      priority: "medium"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "phone": return <Phone className="h-4 w-4" />;
      case "email": return <Mail className="h-4 w-4" />;
      case "video": return <Video className="h-4 w-4" />;
      case "message": return <MessageCircle className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "pending": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-blue-600" />
          Recent Communications
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-1">
          {communications.map((comm) => (
            <div key={comm.id} className="px-6 py-3 hover:bg-muted/50">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    {getIcon(comm.type)}
                    <span className="font-medium">{comm.patient}</span>
                    <Badge className={`text-xs ${getPriorityColor(comm.priority)}`}>
                      {comm.priority}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{comm.subject}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{comm.time}</span>
                    <Badge className={`text-xs ${getStatusColor(comm.status)}`}>
                      {comm.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
