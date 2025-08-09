
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

interface PatientFeedbackTabProps {
  feedbackHistory: any[];
}

export const PatientFeedbackTab = ({ feedbackHistory }: PatientFeedbackTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback History</CardTitle>
        <CardDescription>Patient satisfaction and feedback records</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {feedbackHistory.map(feedback => (
            <div key={feedback.id} className="border rounded-md p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{feedback.type}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Submitted on {feedback.date} for {feedback.submittedFor}
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="font-medium">{feedback.overallScore}/5</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {feedback.responses.map((response: any, index: number) => (
                  <div key={index} className="text-sm">
                    <div className="font-medium">{response.question}</div>
                    <div className="text-muted-foreground">{response.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
