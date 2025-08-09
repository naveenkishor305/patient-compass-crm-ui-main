
import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Communication {
  id: string;
  type: string;
  date: string;
  content: string;
  user: string;
}

interface CommunicationsTabProps {
  communications: Communication[];
}

export const CommunicationsTab = ({ communications }: CommunicationsTabProps) => {
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
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Communication Log</CardTitle>
        <CardDescription>
          Complete history of all case communications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {communications.map((comm) => (
            <div key={comm.id} className="border-b pb-6 last:border-0 last:pb-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      comm.type === "Note" ? "bg-blue-500 text-white" :
                      comm.type === "Email" ? "bg-indigo-500 text-white" :
                      comm.type === "Call" ? "bg-green-500 text-white" :
                      "bg-gray-500 text-white"
                    )}
                  >
                    {comm.type}
                  </Badge>
                  <div className="text-sm font-medium">{comm.date}</div>
                </div>
                <div className="text-sm text-muted-foreground">{comm.user}</div>
              </div>
              <div className="text-sm whitespace-pre-wrap">{comm.content}</div>
            </div>
          ))}

          <form onSubmit={handleAddNote} className="pt-6 border-t">
            <div className="space-y-4">
              <Textarea
                name="noteContent"
                placeholder="Add a new communication note..."
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
        </div>
      </CardContent>
    </Card>
  );
};
