
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PatientVisitHistoryTabProps {
  visitHistory: any[];
}

export const PatientVisitHistoryTab = ({ visitHistory }: PatientVisitHistoryTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visit History</CardTitle>
        <CardDescription>Record of patient hospital/clinic visits</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {visitHistory.map(visit => (
            <div key={visit.id} className="border rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{visit.type} - {visit.summary}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {visit.date} • {visit.department} • {visit.provider}
                  </div>
                </div>
                <Badge variant="outline">{visit.type}</Badge>
              </div>
              <div className="mt-2 text-sm">
                {visit.details}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
