
import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const contactFormSchema = z.object({
  contactMethod: z.string().min(1, "Contact method is required"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactPatientDialogProps {
  caseData: {
    id: string;
    caseId: string;
  };
  patient?: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactPatientDialog({ 
  caseData, 
  patient = { id: "p1", name: "Sarah Johnson", email: "sarah.johnson@example.com", phone: "+1 (555) 123-4567" },
  open, 
  onOpenChange 
}: ContactPatientDialogProps) {
  const [sending, setSending] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      contactMethod: "email",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    setSending(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real application, you would make an API call here
      console.log("Contacting patient:", {
        caseId: caseData.id,
        patientId: patient.id,
        ...data
      });
      
      toast("Message sent", {
        description: `Message sent to ${patient.name} via ${data.contactMethod}.`,
      });
      
      setSending(false);
      onOpenChange(false);
    }, 1500);
  };
  
  // Templates for quick message selection
  const templates = {
    email: [
      {
        title: "Appointment Reminder",
        text: `Dear ${patient.name},\n\nThis is a reminder about your upcoming appointment. Please let us know if you need to reschedule.\n\nThank you,\nHealthcare Team`
      },
      {
        title: "Test Results Available",
        text: `Dear ${patient.name},\n\nYour test results are now available. Please log into the patient portal or contact us to discuss them.\n\nRegards,\nHealthcare Team`
      }
    ],
    sms: [
      {
        title: "Appointment Reminder",
        text: `REMINDER: Your appointment is scheduled for tomorrow. Reply Y to confirm or call us to reschedule.`
      },
      {
        title: "Medication Reminder",
        text: `REMINDER: Don't forget to take your prescribed medication. Contact us if you have any questions.`
      }
    ]
  };

  const selectTemplate = (template: string) => {
    form.setValue("message", template);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Contact Patient</DialogTitle>
          <DialogDescription>
            Send a message to {patient.name} regarding case #{caseData.caseId}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="contactMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select contact method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="email">Email ({patient.email || 'Not available'})</SelectItem>
                      <SelectItem value="sms">SMS ({patient.phone || 'Not available'})</SelectItem>
                      <SelectItem value="portal">Patient Portal</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="border rounded-md p-3">
              <h3 className="text-sm font-medium mb-2">Quick Templates</h3>
              <Tabs defaultValue="email" value={form.getValues().contactMethod}>
                <TabsContent value="email" className="m-0">
                  <div className="flex flex-wrap gap-2">
                    {templates.email.map((template, i) => (
                      <Button 
                        key={i} 
                        variant="outline" 
                        size="sm" 
                        type="button"
                        onClick={() => selectTemplate(template.text)}
                      >
                        {template.title}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="sms" className="m-0">
                  <div className="flex flex-wrap gap-2">
                    {templates.sms.map((template, i) => (
                      <Button 
                        key={i} 
                        variant="outline" 
                        size="sm" 
                        type="button"
                        onClick={() => selectTemplate(template.text)}
                      >
                        {template.title}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="portal" className="m-0">
                  <div className="text-sm text-muted-foreground">
                    The same templates as email are available for portal messages.
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Type your message to the patient" 
                      className="min-h-32"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="border rounded-md p-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Attach Files</h3>
                <Button type="button" variant="outline" size="sm" disabled={form.getValues().contactMethod === "sms"}>
                  Upload
                </Button>
              </div>
              {form.getValues().contactMethod === "sms" && (
                <div className="text-sm text-muted-foreground mt-2">
                  File attachments are not available for SMS messages.
                </div>
              )}
            </div>
            
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={sending}>
                {sending ? "Sending..." : "Send Message"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
