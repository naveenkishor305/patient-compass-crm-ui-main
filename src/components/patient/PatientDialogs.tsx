
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Download } from "lucide-react";

interface PatientDialogsProps {
  isCreateCaseDialogOpen: boolean;
  setIsCreateCaseDialogOpen: (open: boolean) => void;
  isAppointmentDialogOpen: boolean;
  setIsAppointmentDialogOpen: (open: boolean) => void;
  isRescheduleDialogOpen: boolean;
  setIsRescheduleDialogOpen: (open: boolean) => void;
  isNotesDialogOpen: boolean;
  setIsNotesDialogOpen: (open: boolean) => void;
  isEditPreferencesDialogOpen: boolean;
  setIsEditPreferencesDialogOpen: (open: boolean) => void;
  patient: any;
  onCreateCase: () => void;
  onScheduleAppointment: () => void;
  onRescheduleAppointment: () => void;
  onUpdatePreferences: () => void;
  onDownloadNotes: (id: string) => void;
}

export const PatientDialogs = ({
  isCreateCaseDialogOpen,
  setIsCreateCaseDialogOpen,
  isAppointmentDialogOpen,
  setIsAppointmentDialogOpen,
  isRescheduleDialogOpen,
  setIsRescheduleDialogOpen,
  isNotesDialogOpen,
  setIsNotesDialogOpen,
  isEditPreferencesDialogOpen,
  setIsEditPreferencesDialogOpen,
  patient,
  onCreateCase,
  onScheduleAppointment,
  onRescheduleAppointment,
  onUpdatePreferences,
  onDownloadNotes
}: PatientDialogsProps) => {
  return (
    <>
      {/* Create Case Dialog */}
      <Dialog open={isCreateCaseDialogOpen} onOpenChange={setIsCreateCaseDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Case</DialogTitle>
            <DialogDescription>
              Create a new case for {patient.name}. Fill in the required information below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter case subject" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Enter case description" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateCaseDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={onCreateCase}>Create Case</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Schedule Appointment Dialog */}
      <Dialog open={isAppointmentDialogOpen} onOpenChange={setIsAppointmentDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule Appointment</DialogTitle>
            <DialogDescription>
              Schedule a new appointment for {patient.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="appointment-date">Date</Label>
              <Input id="appointment-date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="appointment-time">Time</Label>
              <Input id="appointment-time" type="time" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="appointment-purpose">Purpose</Label>
              <Input id="appointment-purpose" placeholder="Enter appointment purpose" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="appointment-provider">Provider</Label>
              <Select>
                <SelectTrigger id="appointment-provider">
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="dr-chen">Dr. Robert Chen</SelectItem>
                    <SelectItem value="dr-lee">Dr. Elizabeth Lee</SelectItem>
                    <SelectItem value="dr-smith">Dr. Jane Smith</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAppointmentDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={onScheduleAppointment}>Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reschedule Appointment Dialog */}
      <Dialog open={isRescheduleDialogOpen} onOpenChange={setIsRescheduleDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Reschedule Appointment</DialogTitle>
            <DialogDescription>
              Reschedule the existing appointment for {patient.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border rounded-md p-3 bg-muted/50 mb-4">
              <div className="font-medium">Current Appointment</div>
              <div className="text-sm text-muted-foreground">
                April 20, 2023 - 10:30 AM • Follow-up checkup • Dr. Robert Chen
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-date">New Date</Label>
              <Input id="new-date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-time">New Time</Label>
              <Input id="new-time" type="time" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reschedule-reason">Reason for Rescheduling</Label>
              <Input id="reschedule-reason" placeholder="Enter reason for rescheduling" />
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox id="notify-patient" />
              <Label htmlFor="notify-patient">Notify patient of this change</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRescheduleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={onRescheduleAppointment}>Reschedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Appointment Notes Dialog */}
      <Dialog open={isNotesDialogOpen} onOpenChange={setIsNotesDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Appointment Notes</DialogTitle>
            <DialogDescription>
              Notes from appointment on March 15, 2023
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <div className="font-semibold">Post-surgery checkup</div>
              <div className="text-sm text-muted-foreground mt-1">
                March 15, 2023 - 9:00 AM • Dr. Robert Chen
              </div>
            </div>
            <Separator />
            <div>
              <h4 className="text-sm font-medium">Clinical Notes</h4>
              <p className="mt-2">
                Patient is recovering well from surgery. Blood pressure is now within normal range.
                Prescribed continued medication and scheduled a follow-up in one month.
                Patient reports mild discomfort at incision site but no signs of infection.
                Vital signs are stable and cardiac function is improving based on latest echocardiogram.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Medications</h4>
              <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
                <li>Lisinopril 10mg, once daily</li>
                <li>Metoprolol 25mg, twice daily</li>
                <li>Aspirin 81mg, once daily</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium">Follow-up Instructions</h4>
              <p className="mt-2">
                Return in one month for follow-up appointment. Continue current medications.
                Gradually increase physical activity as tolerated. Contact office if experiencing
                increased pain, swelling, or signs of infection at incision site.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onDownloadNotes("a2")}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={() => setIsNotesDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Patient Preferences Dialog */}
      <Dialog open={isEditPreferencesDialogOpen} onOpenChange={setIsEditPreferencesDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Patient Preferences</DialogTitle>
            <DialogDescription>
              Update communication and care preferences for {patient.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="contact-method">Preferred Contact Method</Label>
              <Select defaultValue={patient.preferredContactMethod.toLowerCase()}>
                <SelectTrigger id="contact-method">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="mail">Mail</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Preferred Language</Label>
              <Select defaultValue={patient.preferredLanguage.toLowerCase()}>
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="mandarin">Mandarin</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="appointment-time">Preferred Appointment Time</Label>
              <Select defaultValue="morning">
                <SelectTrigger id="appointment-time">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="morning">Morning</SelectItem>
                    <SelectItem value="afternoon">Afternoon</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <Label>Notification Preferences</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="appt-reminder" defaultChecked />
                <Label htmlFor="appt-reminder">Appointment Reminders</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="med-reminder" defaultChecked />
                <Label htmlFor="med-reminder">Medication Reminders</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="newsletter" defaultChecked />
                <Label htmlFor="newsletter">Newsletter Subscription</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="research" defaultChecked />
                <Label htmlFor="research">Research Participation Interest</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditPreferencesDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={onUpdatePreferences}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
