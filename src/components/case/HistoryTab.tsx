
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface HistoryEvent {
  id: string;
  date: string;
  action: string;
  user: string;
  details: string;
}

interface HistoryTabProps {
  history: HistoryEvent[];
}

export const HistoryTab = ({ history }: HistoryTabProps) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Case History</CardTitle>
        <CardDescription>
          Audit trail of all changes made to this case
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative border-l border-muted ml-4 pl-6 pb-2">
          {history.map((event) => (
            <div key={event.id} className="mb-6 last:mb-0 relative">
              <div className="absolute -left-[10px] h-5 w-5 rounded-full border border-muted bg-background"></div>
              <div className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-sm font-medium">{event.action}</span>
                <span className="text-xs text-muted-foreground">{event.date}</span>
              </div>
              <div className="mt-1 text-sm">{event.details}</div>
              <div className="mt-1 text-xs text-muted-foreground">
                By: {event.user}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
