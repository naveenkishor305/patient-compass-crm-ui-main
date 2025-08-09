
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Clock, Calendar, PhoneCall } from "lucide-react";
import { StatusCard } from "./StatusCard";

export const StatsCardGrid = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Tasks Due Today"
        value="5"
        icon={Clock}
        description="2 high priority"
      />
      <StatsCard
        title="Upcoming Appointments"
        value="8"
        icon={Calendar}
        description="Today"
      />
      <StatsCard
        title="Calls Waiting"
        value="3"
        icon={PhoneCall}
        trend={{ value: 2, isPositive: false }}
        description="in Queue"
      />
      <StatusCard status="Available" since="9:30 AM" />
    </div>
  );
};
