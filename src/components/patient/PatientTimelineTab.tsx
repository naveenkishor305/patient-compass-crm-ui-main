
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MessageSquare, MapPin, ClipboardList, Star, Clock } from "lucide-react";

interface PatientTimelineTabProps {
  interactions: any[];
}

export const PatientTimelineTab = ({ interactions }: PatientTimelineTabProps) => {
  const getInteractionIcon = (type: string) => {
    switch (type) {
      case "Call":
        return <Phone className="h-4 w-4 text-blue-500" />;
      case "Email":
        return <Mail className="h-4 w-4 text-indigo-500" />;
      case "SMS":
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      case "Visit":
        return <MapPin className="h-4 w-4 text-purple-500" />;
      case "Case Created":
        return <ClipboardList className="h-4 w-4 text-amber-500" />;
      case "Feedback":
        return <Star className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interaction Timeline</CardTitle>
        <CardDescription>Complete history of patient interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative border-l border-muted ml-4 pl-6 pb-2">
          {interactions.map((interaction, index) => (
            <div key={interaction.id} className="mb-8 relative">
              <div className="absolute -left-[38px] bg-white border border-muted rounded-full p-1 flex items-center justify-center">
                {getInteractionIcon(interaction.type)}
              </div>
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-sm font-medium">{interaction.type}</span>
                <span className="text-xs text-muted-foreground">{interaction.date}</span>
              </div>
              <div className="mt-1 text-sm">{interaction.description}</div>
              <div className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                <span>By: {interaction.agent}</span>
                {interaction.caseId && <span>Case: #{interaction.caseId}</span>}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
