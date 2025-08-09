
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const escalateFormSchema = z.object({
  escalationLevel: z.string().min(1, "Escalation level is required"),
  escalateToId: z.string().min(1, "Escalation recipient is required"),
  reason: z.string().min(1, "Reason is required"),
});

type EscalateFormValues = z.infer<typeof escalateFormSchema>;

interface EscalateCaseDialogProps {
  caseData: {
    id: string;
    caseId: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EscalateCaseDialog({ caseData, open, onOpenChange }: EscalateCaseDialogProps) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState<EscalateFormValues | null>(null);
  
  const form = useForm<EscalateFormValues>({
    resolver: zodResolver(escalateFormSchema),
    defaultValues: {
      escalationLevel: "",
      escalateToId: "",
      reason: "",
    },
  });

  const handleSubmitForm = (data: EscalateFormValues) => {
    setFormData(data);
    setShowConfirm(true);
  };

  const confirmEscalation = () => {
    if (!formData) return;
    
    // In a real application, you would make an API call here
    console.log("Escalating case:", {
      caseId: caseData.id,
      ...formData
    });
    
    toast("Case escalated", {
      description: `Case #${caseData.caseId} has been escalated.`,
    });
    
    setShowConfirm(false);
    onOpenChange(false);
    
    // Force refresh the current page to show updates
    navigate(0);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Escalate Case</DialogTitle>
            <DialogDescription>
              Escalate case #{caseData.caseId} to higher level of management or specialized team
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-4">
              <FormField
                control={form.control}
                name="escalationLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Escalation Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="team-lead">Team Lead</SelectItem>
                        <SelectItem value="supervisor">Supervisor</SelectItem>
                        <SelectItem value="manager">Department Manager</SelectItem>
                        <SelectItem value="director">Medical Director</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="escalateToId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Escalate To</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select recipient" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="u1">Dr. Jane Smith (Team Lead)</SelectItem>
                        <SelectItem value="u2">Dr. Robert Chen (Supervisor)</SelectItem>
                        <SelectItem value="u3">Dr. Elizabeth Wong (Manager)</SelectItem>
                        <SelectItem value="u4">Dr. James Wilson (Medical Director)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for Escalation</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Explain why this case needs escalation" 
                        className="resize-none"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-4">
                <DialogClose asChild>
                  <Button variant="outline" type="button">Cancel</Button>
                </DialogClose>
                <Button type="submit" variant="destructive">Escalate Case</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will escalate Case #{caseData.caseId} and notify management. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmEscalation} className="bg-healthcare-danger text-white hover:bg-healthcare-danger/90">
              Yes, Escalate Case
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
