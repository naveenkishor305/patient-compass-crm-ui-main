
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MessageCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseDetailsTabProps {
  caseData: {
    description: string;
    status: string;
    priority: string;
    type: string;
    subType: string;
    channel: string;
    createdDate: string;
    createdBy: string;
    sla: {
      status: string;
      target: string;
      timeRemaining: string;
    };
  };
}

export const CaseDetailsTab = ({ caseData }: CaseDetailsTabProps) => {
  const { toast } = useToast();

  const handleAddNote = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const noteContent = form.noteContent.value;

    toast({
      title: "Note Added",
      description: "Your note has been added to the case.",
    });

    // Clear the form
    form.reset();
  };

  return (
    <div className="space-y-6 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Case Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{caseData.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Case Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-medium capitalize">{caseData.status.replace("-", " ")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Priority:</span>
              <span className="font-medium capitalize">{caseData.priority}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span className="font-medium">{caseData.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sub-Type:</span>
              <span className="font-medium">{caseData.subType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created By:</span>
              <span className="font-medium">{caseData.createdBy}</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Source Channel:</span>
              <span className="font-medium">{caseData.channel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created Date:</span>
              <span className="font-medium">{caseData.createdDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Resolution Target:</span>
              <span className="font-medium">{caseData.sla.target}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">SLA Status:</span>
              <div className="flex items-center gap-2">
                <Clock className={cn(
                  "h-4 w-4",
                  caseData.sla.status === "on-track" ? "text-healthcare-success" :
                  caseData.sla.status === "at-risk" ? "text-healthcare-warning" :
                  "text-healthcare-danger"
                )} />
                <span className="font-medium capitalize">{caseData.sla.status.replace("-", " ")}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time Remaining:</span>
              <span className={cn(
                "font-medium",
                caseData.sla.status === "on-track" ? "text-healthcare-success" :
                caseData.sla.status === "at-risk" ? "text-healthcare-warning" :
                "text-healthcare-danger"
              )}>{caseData.sla.timeRemaining}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add Communication Note</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddNote}>
            <div className="space-y-4">
              <Textarea
                name="noteContent"
                placeholder="Enter your case notes here..."
                className="min-h-32"
              />
              <div className="flex justify-end">
                <Button type="submit">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
