
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface StatusCardProps {
  status: string;
  since: string;
}

export const StatusCard = ({ status, since }: StatusCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">My Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <Badge className="bg-green-500 mr-2" />
          <span className="text-xl font-bold">{status}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Since {since}
        </p>
      </CardContent>
    </Card>
  );
};
