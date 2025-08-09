
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface AssigneeCardProps {
  assignee: {
    id: string;
    name: string;
    role: string;
  };
}

export const AssigneeCard = ({ assignee }: AssigneeCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assigned To</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>
              {assignee.name.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{assignee.name}</div>
            <div className="text-sm text-muted-foreground">
              {assignee.role}
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <Button variant="outline" className="w-full">
          Reassign Case
        </Button>
      </CardContent>
    </Card>
  );
};
