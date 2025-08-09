
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const slaFormSchema = z.object({
  extendUntil: z.date({
    required_error: "Extension date is required",
  }),
  reason: z.string().min(1, "Reason is required"),
});

type SLAFormValues = z.infer<typeof slaFormSchema>;

interface ExtendSLADialogProps {
  caseData: {
    id: string;
    caseId: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ExtendSLADialog({ caseData, open, onOpenChange }: ExtendSLADialogProps) {
  const navigate = useNavigate();
  
  // Set default extension date to 3 days from now
  const defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() + 3);
  
  const form = useForm<SLAFormValues>({
    resolver: zodResolver(slaFormSchema),
    defaultValues: {
      extendUntil: defaultDate,
      reason: "",
    },
  });

  const onSubmit = (data: SLAFormValues) => {
    // In a real application, you would make an API call here
    console.log("Extending SLA:", {
      caseId: caseData.id,
      extendUntil: data.extendUntil,
      reason: data.reason
    });
    
    toast("SLA Extended", {
      description: `Case #${caseData.caseId} SLA extended until ${format(data.extendUntil, "PPP")}.`,
    });
    
    onOpenChange(false);
    
    // Force refresh the current page to show updates
    navigate(0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Extend SLA</DialogTitle>
          <DialogDescription>
            Extend the service level agreement deadline for case #{caseData.caseId}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="extendUntil"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Extend Until</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Extension</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Explain why the SLA needs to be extended" 
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
              <Button type="submit">Extend SLA</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
