
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ClockIcon, Link as LinkIcon, MessageCircle } from "lucide-react";
import { ContactPatientDialog } from "./ContactPatientDialog";
import { ExtendSLADialog } from "./ExtendSLADialog";
import { LinkRelatedCaseDialog } from "./LinkRelatedCaseDialog";
import { EscalateCaseDialog } from "./EscalateCaseDialog";

interface QuickActionsCardProps {
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
}

export const QuickActionsCard = ({ 
  caseData = { id: "c1", caseId: "CSE-1234" },
  patient = { id: "p1", name: "Sarah Johnson", email: "sarah.johnson@example.com", phone: "+1 (555) 123-4567" }
}: QuickActionsCardProps) => {
  const [contactDialogOpen, setContactDialogOpen] = useState(false);
  const [extendSLADialogOpen, setExtendSLADialogOpen] = useState(false);
  const [linkCaseDialogOpen, setLinkCaseDialogOpen] = useState(false);
  const [escalateDialogOpen, setEscalateDialogOpen] = useState(false);

  return (
    <>
      <Card className="shadow-card hover:shadow-card-hover transition-shadow">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pt-0">
          <Button 
            className="w-full justify-start bg-healthcare-primary text-white hover:bg-healthcare-dark"
            onClick={() => setContactDialogOpen(true)}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact Patient
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start border-healthcare-primary text-healthcare-primary hover:bg-healthcare-light hover:text-healthcare-dark"
            onClick={() => setExtendSLADialogOpen(true)}
          >
            <ClockIcon className="h-4 w-4 mr-2" />
            Extend SLA
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start border-healthcare-primary text-healthcare-primary hover:bg-healthcare-light hover:text-healthcare-dark"
            onClick={() => setLinkCaseDialogOpen(true)}
          >
            <LinkIcon className="h-4 w-4 mr-2" />
            Link Related Case
          </Button>
          <Button 
            variant="outline" 
            className="w-full justify-start text-healthcare-danger border-healthcare-danger hover:bg-red-50 hover:text-healthcare-danger"
            onClick={() => setEscalateDialogOpen(true)}
          >
            <AlertCircle className="h-4 w-4 mr-2" />
            Escalate Case
          </Button>
        </CardContent>
      </Card>
      
      <ContactPatientDialog
        caseData={caseData}
        patient={patient}
        open={contactDialogOpen}
        onOpenChange={setContactDialogOpen}
      />
      
      <ExtendSLADialog
        caseData={caseData}
        open={extendSLADialogOpen}
        onOpenChange={setExtendSLADialogOpen}
      />
      
      <LinkRelatedCaseDialog
        caseData={caseData}
        open={linkCaseDialogOpen}
        onOpenChange={setLinkCaseDialogOpen}
      />
      
      <EscalateCaseDialog
        caseData={caseData}
        open={escalateDialogOpen}
        onOpenChange={setEscalateDialogOpen}
      />
    </>
  );
};
