
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "open":
      return <Badge className="bg-healthcare-accent text-white font-medium px-2.5 py-1">Open</Badge>;
    case "in-progress":
      return <Badge className="bg-healthcare-secondary text-healthcare-dark font-medium px-2.5 py-1">In Progress</Badge>;
    case "pending":
      return <Badge className="bg-healthcare-warning text-black font-medium px-2.5 py-1">Pending</Badge>;
    case "resolved":
      return <Badge className="bg-healthcare-success text-white font-medium px-2.5 py-1">Resolved</Badge>;
    case "closed":
      return <Badge className="bg-gray-500 text-white font-medium px-2.5 py-1">Closed</Badge>;
    default:
      return <Badge variant="outline" className="font-medium px-2.5 py-1">{status}</Badge>;
  }
};

export const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return <Badge className="bg-healthcare-danger text-white font-medium px-2.5 py-1">High</Badge>;
    case "medium":
      return <Badge className="bg-healthcare-warning text-black font-medium px-2.5 py-1">Medium</Badge>;
    case "low":
      return <Badge className="bg-healthcare-primary text-white font-medium px-2.5 py-1">Low</Badge>;
    default:
      return <Badge variant="outline" className="font-medium px-2.5 py-1">{priority}</Badge>;
  }
};

// New utility function for SLA badges
export const getSLABadge = (status: "on-track" | "at-risk" | "breached") => {
  switch (status) {
    case "on-track":
      return <Badge className="bg-healthcare-success text-white font-medium px-2.5 py-1">On Track</Badge>;
    case "at-risk":
      return <Badge className="bg-healthcare-warning text-black font-medium px-2.5 py-1">At Risk</Badge>;
    case "breached":
      return <Badge className="bg-healthcare-danger text-white font-medium px-2.5 py-1">Breached</Badge>;
    default:
      return <Badge variant="outline" className="font-medium px-2.5 py-1">{status}</Badge>;
  }
};

// New function for department badges
export const getDepartmentBadge = (department: string) => {
  const deptColors: Record<string, string> = {
    "cardiology": "bg-blue-100 text-blue-800",
    "oncology": "bg-purple-100 text-purple-800",
    "neurology": "bg-indigo-100 text-indigo-800",
    "pediatrics": "bg-green-100 text-green-800",
    "surgery": "bg-orange-100 text-orange-800",
    "internal": "bg-teal-100 text-teal-800",
    "emergency": "bg-red-100 text-red-800",
    "radiology": "bg-yellow-100 text-yellow-800",
  };

  const className = deptColors[department.toLowerCase()] || "bg-gray-100 text-gray-800";
  
  return (
    <Badge variant="outline" className={cn("font-medium px-2 py-0.5 border-none", className)}>
      {department}
    </Badge>
  );
};
