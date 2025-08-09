
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export const RecentReports = () => {
  const reports = [
    {
      id: "r1",
      title: "Lab Results - Sarah Johnson",
      type: "Lab Report",
      date: "Today, 9:30 AM",
      status: "new",
      patient: "Sarah Johnson"
    },
    {
      id: "r2",
      title: "Radiology Report - Michael Chen",
      type: "Imaging",
      date: "Yesterday, 2:15 PM",
      status: "reviewed",
      patient: "Michael Chen"
    },
    {
      id: "r3",
      title: "Pathology Report - Emma Davis",
      type: "Pathology",
      date: "2 days ago",
      status: "pending",
      patient: "Emma Davis"
    },
    {
      id: "r4",
      title: "Cardiology Consult - Robert Wilson",
      type: "Consultation",
      date: "3 days ago",
      status: "reviewed",
      patient: "Robert Wilson"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "pending": return "bg-amber-100 text-amber-800";
      case "reviewed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-green-600" />
          Recent Reports
        </CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-1">
          {reports.map((report) => (
            <div key={report.id} className="px-6 py-3 hover:bg-muted/50">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{report.title}</span>
                    <Badge className={`text-xs ${getStatusColor(report.status)}`}>
                      {report.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{report.type}</div>
                  <div className="text-xs text-muted-foreground">{report.date}</div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
