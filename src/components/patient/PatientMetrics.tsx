
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, CalendarCheck, HeartPulse, Clock, Stethoscope } from "lucide-react";

interface MetricProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const Metric = ({ title, value, description, icon, trend }: MetricProps) => {
  return (
    <Card className="bg-card/50 border-muted">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <div className="h-5 w-5 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            {trend && (
              <span className={trend.isPositive ? "text-healthcare-success mr-1" : "text-healthcare-danger mr-1"}>
                {trend.isPositive ? <TrendingUp className="h-3 w-3 inline mr-0.5" /> : <TrendingDown className="h-3 w-3 inline mr-0.5" />}
                {Math.abs(trend.value)}%
              </span>
            )}
            {description}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface PatientMetricsProps {
  patientId: string;
}

export const PatientMetrics = ({ patientId }: PatientMetricsProps) => {
  // In a real application, these values would come from API calls
  // based on the patientId
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Metric
        title="Total Visits"
        value="24"
        description="Last 12 months"
        icon={<CalendarCheck className="h-5 w-5" />}
        trend={{ value: 8, isPositive: true }}
      />
      <Metric
        title="Avg. Visit Duration"
        value="42 min"
        description="Last 5 visits"
        icon={<Clock className="h-5 w-5" />}
        trend={{ value: 5, isPositive: false }}
      />
      <Metric
        title="Active Treatments"
        value="3"
        description="Cardiology, Oncology"
        icon={<Stethoscope className="h-5 w-5" />}
      />
      <Metric
        title="Patient Satisfaction"
        value="4.8/5"
        description="Based on 12 surveys"
        icon={<HeartPulse className="h-5 w-5" />}
        trend={{ value: 12, isPositive: true }}
      />
    </div>
  );
};
