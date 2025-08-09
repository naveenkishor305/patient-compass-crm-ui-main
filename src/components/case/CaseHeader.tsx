
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Edit } from "lucide-react";
import { getStatusBadge, getPriorityBadge } from "@/components/case/CaseUtils";
import { EditCaseDialog } from "@/components/case/EditCaseDialog";
import { UpdateStatusDialog } from "@/components/case/UpdateStatusDialog";

interface CaseHeaderProps {
  caseData: {
    id: string;
    caseId: string;
    subject: string;
    status: string;
    priority: string;
    type: string;
    subType: string;
    createdDate: string;
    description?: string;
  };
}

export const CaseHeader = ({ caseData }: CaseHeaderProps) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center text-sm text-muted-foreground mb-2">
        <Link to="/cases" className="hover:underline">
          Cases
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span>{caseData.caseId}</span>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-3xl font-bold tracking-tight">{caseData.subject}</h1>
            <div className="flex items-center gap-1">
              {getStatusBadge(caseData.status as string)}
              {getPriorityBadge(caseData.priority as string)}
            </div>
          </div>
          <div className="text-muted-foreground mt-1">
            Case #{caseData.caseId} • Created {caseData.createdDate} • {caseData.type} / {caseData.subType}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <Button variant="outline" onClick={() => setStatusDialogOpen(true)}>Update Status</Button>
          <Button onClick={() => setEditDialogOpen(true)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit Case
          </Button>
        </div>
      </div>

      <EditCaseDialog 
        caseData={caseData} 
        open={editDialogOpen} 
        onOpenChange={setEditDialogOpen} 
      />

      <UpdateStatusDialog
        caseData={caseData}
        open={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
      />
    </div>
  );
};
