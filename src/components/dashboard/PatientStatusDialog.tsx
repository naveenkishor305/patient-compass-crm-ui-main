
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, UserX, Search } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PatientStatusDialogProps {
  isOpen: boolean;
  onClose: () => void;
  action: "inactive" | "deceased" | null;
}

export const PatientStatusDialog = ({ isOpen, onClose, action }: PatientStatusDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  const mockPatients = [
    { id: "p1", name: "Sarah Johnson", crn: "CRN-12345" },
    { id: "p2", name: "Michael Chen", crn: "CRN-23456" },
    { id: "p3", name: "Emma Davis", crn: "CRN-34567" },
  ];

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.crn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = () => {
    if (!selectedPatient || !reason) {
      toast({
        title: "Missing Information",
        description: "Please select a patient and provide a reason.",
        variant: "destructive",
      });
      return;
    }

    const selectedPatientData = mockPatients.find(p => p.id === selectedPatient);
    toast({
      title: `Patient Status Updated`,
      description: `${selectedPatientData?.name} has been marked as ${action}.`,
    });

    // Reset form
    setSearchQuery("");
    setSelectedPatient(null);
    setReason("");
    setNotes("");
    onClose();
  };

  const getIcon = () => {
    if (action === "deceased") return <AlertTriangle className="h-5 w-5 text-red-500" />;
    return <UserX className="h-5 w-5 text-amber-500" />;
  };

  const getTitle = () => {
    if (action === "deceased") return "Mark Patient as Deceased";
    return "Mark Patient as Inactive";
  };

  const getDescription = () => {
    if (action === "deceased") return "This will permanently mark the patient as deceased in the system.";
    return "This will mark the patient as inactive and they will not appear in active patient lists.";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getIcon()}
            {getTitle()}
          </DialogTitle>
          <DialogDescription>
            {getDescription()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Patient Search */}
          <div className="space-y-2">
            <Label htmlFor="patient-search">Search Patient</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="patient-search"
                placeholder="Search by name or CRN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Patient Selection */}
          {searchQuery && (
            <div className="space-y-2">
              <Label>Select Patient</Label>
              <div className="max-h-32 overflow-y-auto border rounded">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className={`p-2 cursor-pointer hover:bg-gray-50 ${
                      selectedPatient === patient.id ? "bg-blue-50 border-l-4 border-blue-500" : ""
                    }`}
                    onClick={() => setSelectedPatient(patient.id)}
                  >
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-sm text-gray-500">{patient.crn}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason *</Label>
            <Input
              id="reason"
              placeholder={action === "deceased" ? "Cause of death" : "Reason for inactivation"}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Additional information..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit}
              className={`flex-1 ${
                action === "deceased" 
                  ? "bg-red-600 hover:bg-red-700" 
                  : "bg-amber-600 hover:bg-amber-700"
              }`}
            >
              {action === "deceased" ? "Mark Deceased" : "Mark Inactive"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
