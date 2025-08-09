
import React from "react";
import { 
  Clock, 
  Calendar, 
  MessageCircle, 
  FilePlus, 
  FileMinus, 
  FileText, 
  Pill,
  Stethoscope,
  HeartPulse,
  Clipboard,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description?: string;
  type: "appointment" | "message" | "document" | "billing" | "medication" | "diagnosis" | "lab" | "call";
  status?: string;
}

interface PatientTimelineProps {
  events: TimelineEvent[];
}

const getEventIcon = (type: TimelineEvent["type"]) => {
  switch (type) {
    case "appointment":
      return <Calendar className="h-5 w-5 text-healthcare-primary" />;
    case "message":
      return <MessageCircle className="h-5 w-5 text-healthcare-accent" />;
    case "document":
      return <FileText className="h-5 w-5 text-healthcare-secondary" />;
    case "billing":
      return <FileMinus className="h-5 w-5 text-healthcare-warning" />;
    case "medication":
      return <Pill className="h-5 w-5 text-healthcare-accent" />;
    case "diagnosis":
      return <Stethoscope className="h-5 w-5 text-healthcare-dark" />;
    case "lab":
      return <Clipboard className="h-5 w-5 text-healthcare-secondary" />;
    case "call":
      return <Phone className="h-5 w-5 text-healthcare-dark" />;
    default:
      return <Clock className="h-5 w-5 text-muted-foreground" />;
  }
};

const getStatusBadgeClasses = (status?: string) => {
  if (!status) return "";
  
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-healthcare-success text-white";
    case "scheduled":
      return "bg-healthcare-secondary text-healthcare-dark";
    case "pending":
      return "bg-healthcare-warning text-black";
    case "cancelled":
      return "bg-healthcare-danger text-white";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const PatientTimeline = ({ events }: PatientTimelineProps) => {
  return (
    <div className="space-y-1">
      {events.map((event) => (
        <div key={event.id} className="flex gap-4 py-4 border-b border-border last:border-0">
          <div className="mt-1">
            {getEventIcon(event.type)}
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
              <h4 className="font-medium">{event.title}</h4>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{event.date}</span>
                {event.status && (
                  <span className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                    getStatusBadgeClasses(event.status)
                  )}>
                    {event.status}
                  </span>
                )}
              </div>
            </div>
            {event.description && (
              <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
