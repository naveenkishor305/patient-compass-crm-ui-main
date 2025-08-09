
export const mockTasks = [
  {
    id: "1",
    title: "Follow up with patient Sarah Johnson about appointment",
    priority: "high" as const,
    patient: { id: "p1", name: "Sarah Johnson" },
    dueDate: "Today, 2:00 PM",
    completed: false,
  },
  {
    id: "2",
    title: "Call Michael Williams to confirm appointment",
    priority: "medium" as const,
    patient: { id: "p2", name: "Michael Williams" },
    dueDate: "Today, 4:30 PM",
    completed: false,
  },
  {
    id: "3",
    title: "Remind David Brown about insurance forms",
    priority: "medium" as const,
    patient: { id: "p3", name: "David Brown" },
    dueDate: "Tomorrow, 10:00 AM",
    completed: false,
  },
];

export const mockAppointments = [
  {
    id: "a1",
    patient: { id: "p1", name: "Sarah Johnson" },
    time: "Today, 2:30 PM",
    provider: "Dr. Michael Chen",
    type: "Check-up"
  },
  {
    id: "a2",
    patient: { id: "p5", name: "Robert Wilson" },
    time: "Today, 3:15 PM",
    provider: "Dr. Jane Smith",
    type: "Follow-up"
  },
  {
    id: "a3",
    patient: { id: "p2", name: "Michael Williams" },
    time: "Tomorrow, 11:00 AM",
    provider: "Dr. Michael Chen",
    type: "Initial Consultation"
  }
];

export const mockPatients = [
  {
    id: "p1",
    name: "Sarah Johnson",
    crn: "CRN-12345",
    lastInteraction: "10 minutes ago",
    isHighRisk: true,
  },
  {
    id: "p2",
    name: "Michael Williams",
    crn: "CRN-23456",
    lastInteraction: "2 hours ago",
  },
  {
    id: "p3",
    name: "David Brown",
    crn: "CRN-34567",
    lastInteraction: "Yesterday",
  },
  {
    id: "p4",
    name: "Emily Davis",
    crn: "CRN-45678",
    lastInteraction: "2 days ago",
    isVIP: true,
  }
];
