import { StatsCard } from "@/components/dashboard/StatsCard";
import { CaseList } from "@/components/dashboard/CaseList";
import { TaskList } from "@/components/dashboard/TaskList";
import { User } from "@/types/user";
import { CasesLineChart } from "@/components/charts/CasesLineChart";
import { Activity, CheckCheck, Clock, ClipboardList, Smile, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
interface ManagementDashboardProps {
  currentUser: User;
}
export const ManagementDashboard = ({
  currentUser
}: ManagementDashboardProps) => {
  const navigate = useNavigate();

  // Mock data for demonstration purposes
  const caseChartData = [{
    name: "Jan",
    created: 65,
    resolved: 40
  }, {
    name: "Feb",
    created: 59,
    resolved: 48
  }, {
    name: "Mar",
    created: 80,
    resolved: 65
  }, {
    name: "Apr",
    created: 81,
    resolved: 90
  }, {
    name: "May",
    created: 56,
    resolved: 85
  }, {
    name: "Jun",
    created: 55,
    resolved: 53
  }, {
    name: "Jul",
    created: 40,
    resolved: 45
  }];
  const caseTypeData = [{
    name: "Billing",
    value: 35
  }, {
    name: "Clinical",
    value: 25
  }, {
    name: "Administrative",
    value: 20
  }, {
    name: "Technical",
    value: 15
  }, {
    name: "Other",
    value: 5
  }];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  const cases = [{
    id: "c1",
    caseId: "CSE-1234",
    subject: "Post-surgery follow-up inquiry",
    status: "in-progress" as const,
    patient: {
      id: "p1",
      name: "Sarah Johnson"
    },
    priority: "high" as const,
    createdDate: "Apr 10, 2023",
    sla: {
      status: "at-risk" as const,
      timeRemaining: "2 hours remaining"
    }
  }, {
    id: "c4",
    caseId: "CSE-1237",
    subject: "Medication side effects report",
    status: "open" as const,
    patient: {
      id: "p4",
      name: "Emily Davis"
    },
    priority: "high" as const,
    createdDate: "Apr 7, 2023",
    sla: {
      status: "breached" as const
    }
  }];
  const tasks = [{
    id: "1",
    title: "Follow up with patient Sarah Johnson about medication",
    priority: "high" as const,
    patient: {
      id: "p1",
      name: "Sarah Johnson"
    },
    dueDate: "Today, 2:00 PM",
    completed: false
  }, {
    id: "2",
    title: "Review lab results for Michael Williams",
    priority: "medium" as const,
    patient: {
      id: "p2",
      name: "Michael Williams"
    },
    dueDate: "Today, 4:30 PM",
    completed: false
  }, {
    id: "3",
    title: "Call pharmacy about prescription refill",
    priority: "medium" as const,
    patient: {
      id: "p3",
      name: "David Brown"
    },
    dueDate: "Tomorrow, 10:00 AM",
    completed: false
  }];
  const teamWorkload = [{
    name: "Jane Smith",
    caseCount: 12,
    taskCount: 8
  }, {
    name: "Robert Johnson",
    caseCount: 9,
    taskCount: 15
  }, {
    name: "Emily Davis",
    caseCount: 7,
    taskCount: 4
  }, {
    name: "Michael Brown",
    caseCount: 10,
    taskCount: 11
  }];
  const handleViewCase = (caseId: string) => {
    navigate(`/cases/${caseId}`);
  };
  return <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative w-full max-w-md mx-auto lg:mx-0">
        <input type="text" placeholder="Search cases, patients or team members..." className="w-full h-10 pl-10 pr-4 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-slate-100" />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Activity className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Key Operational Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <StatsCard title="Total Cases" value="243" icon={ClipboardList} trend={{
        value: 12,
        isPositive: true
      }} description="vs. last month" />
        <StatsCard title="Resolved Cases" value="187" icon={CheckCheck} trend={{
        value: 8,
        isPositive: true
      }} description="vs. last month" />
        <StatsCard title="Open Cases" value="56" icon={ClipboardList} trend={{
        value: 5,
        isPositive: false
      }} description="vs. last month" />
        <StatsCard title="Avg. Resolution Time" value="2.3 days" icon={Clock} trend={{
        value: 15,
        isPositive: true
      }} description="vs. last month" />
        <StatsCard title="SLA Compliance" value="92%" icon={Activity} trend={{
        value: 3,
        isPositive: true
      }} description="vs. last month" />
        <StatsCard title="Avg. CSAT Score" value="4.7/5" icon={Smile} trend={{
        value: 2,
        isPositive: true
      }} description="vs. last month" />
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Case Volume Trend</CardTitle>
            <CardDescription>Created vs. Resolved Cases</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <CasesLineChart data={caseChartData} title="" description="" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Cases by Type</CardTitle>
            <CardDescription>Distribution of case categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={caseTypeData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({
                  name,
                  percent
                }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {caseTypeData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={value => [`${value} cases`, 'Count']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cases at Risk and Team Workload */}
      <div className="grid gap-6 md:grid-cols-2">
        <CaseList title="Cases At Risk / Breached SLA" description="Cases requiring immediate attention" cases={cases} onViewCase={handleViewCase} />
        <Card>
          <CardHeader>
            <CardTitle>Team Workload Distribution</CardTitle>
            <CardDescription>Active cases and tasks per team member</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <div className="space-y-1">
              {teamWorkload.map((member, index) => <div key={index} className="flex items-center justify-between px-6 py-4 hover:bg-muted/50">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-muted-foreground mr-2" />
                    <div className="font-medium">{member.name}</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-muted-foreground">Cases</span>
                      <span className="font-semibold">{member.caseCount}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-muted-foreground">Tasks</span>
                      <span className="font-semibold">{member.taskCount}</span>
                    </div>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Tasks Due Soon */}
      <div>
        <TaskList title="Team Tasks Due Soon" description="Tasks assigned to team members with upcoming deadlines" tasks={tasks} showAssignee={true} />
      </div>
    </div>;
};