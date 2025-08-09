
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Download } from "lucide-react";

interface PatientMedicalTabProps {
  medicalRecords: any[];
  onDownloadNotes: (recordId: string) => void;
}

export const PatientMedicalTab = ({ medicalRecords, onDownloadNotes }: PatientMedicalTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Records</CardTitle>
        <CardDescription>Healthcare information from the HIS system</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {medicalRecords.map(record => (
            <div key={record.id} className="border rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{record.type}</div>
                  <div className="text-sm mt-1">
                    {record.summary}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {record.date} • {record.provider}
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">View Details</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{record.type} - {record.date}</DialogTitle>
                      <DialogDescription>Provider: {record.provider}</DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="text-sm font-medium">Summary</h4>
                        <p className="mt-1">{record.summary}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Details</h4>
                        <p className="mt-1">{record.details}</p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => onDownloadNotes(record.id)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Button variant="outline">Load More Records</Button>
        </div>
      </CardContent>
    </Card>
  );
};
