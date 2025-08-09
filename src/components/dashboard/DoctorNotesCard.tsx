
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NotepadText, Link, Eye, Plus } from "lucide-react";
import { useState, useEffect } from "react";

interface DoctorNote {
  id: string;
  content: string;
  timestamp: string;
  linkedTo?: {
    type: 'case' | 'task' | 'patient';
    id: string;
    name: string;
  };
}

export const DoctorNotesCard = () => {
  const [notes, setNotes] = useState<DoctorNote[]>([]);

  useEffect(() => {
    // Load notes from localStorage
    const savedNotes = localStorage.getItem("doctorNotesHistory");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  const getLinkedBadgeColor = (type: string) => {
    switch (type) {
      case 'case': return 'bg-blue-100 text-blue-800';
      case 'task': return 'bg-green-100 text-green-800';
      case 'patient': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <NotepadText className="h-5 w-5" />
          Recent Notes
        </CardTitle>
        <CardDescription>Your latest doctor notes and linked items</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {notes.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <NotepadText className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No notes yet. Click the floating notepad to start taking notes.</p>
          </div>
        ) : (
          <>
            {notes.slice(0, 3).map((note) => (
              <div key={note.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <p className="text-sm text-gray-600 flex-1">
                    {truncateText(note.content, 100)}
                  </p>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {note.timestamp}
                  </span>
                  {note.linkedTo && (
                    <Badge variant="secondary" className={getLinkedBadgeColor(note.linkedTo.type)}>
                      <Link className="h-3 w-3 mr-1" />
                      {note.linkedTo.type}: {note.linkedTo.name}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
            
            {notes.length > 3 && (
              <Button variant="outline" size="sm" className="w-full">
                View All Notes ({notes.length})
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
