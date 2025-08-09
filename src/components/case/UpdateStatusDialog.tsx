
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const statusFormSchema = z.object({
  status: z.string().min(1, "Status is required"),
});

type StatusFormValues = z.infer<typeof statusFormSchema>;

interface UpdateStatusDialogProps {
  caseData: {
    id: string;
    caseId: string;
    status: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateStatusDialog({ caseData, open, onOpenChange }: UpdateStatusDialogProps) {
  const navigate = useNavigate();
  
  const form = useForm<StatusFormValues>({
    resolver: zodResolver(statusFormSchema),
    defaultValues: {
      status: caseData.status,
    },
  });

  const onSubmit = (data: StatusFormValues) => {
    // In a real application, you would make an API call here
    console.log("Updating case status:", {
      caseId: caseData.id,
      status: data.status
    });
    
    toast("Case status updated", {
      description: `Case #${caseData.caseId} status changed to ${data.status}.`,
    });
    
    onOpenChange(false);
    
    // Force refresh the current page to show updates
    navigate(0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Case Status</DialogTitle>
          <DialogDescription>
            Change the status for case #{caseData.caseId}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button">Cancel</Button>
              </DialogClose>
              <Button type="submit">Update Status</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
