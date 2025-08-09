import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NotepadText, X, Save, Minimize2, Maximize2, Link, Unlink } from "lucide-react";
import { toast } from "sonner";

interface LinkedItem {
  type: 'case' | 'task' | 'patient';
  id: string;
  name: string;
}

interface DoctorNote {
  id: string;
  content: string;
  timestamp: string;
  linkedTo?: LinkedItem;
}

export const FloatingNotepad = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [notes, setNotes] = useState("");
  const [showLinkSection, setShowLinkSection] = useState(false);
  const [linkType, setLinkType] = useState<'case' | 'task' | 'patient'>('case');
  const [linkId, setLinkId] = useState("");
  const [linkName, setLinkName] = useState("");

  // Mock data for linking options
  const mockCases = [
    { id: "CSE-1234", name: "Post-surgery follow-up inquiry" },
    { id: "CSE-1235", name: "Insurance claim rejection" },
    { id: "CSE-1236", name: "Medication side effects" }
  ];

  const mockTasks = [
    { id: "T-001", name: "Call patient for follow-up" },
    { id: "T-002", name: "Review lab results" },
    { id: "T-003", name: "Schedule emergency appointment" }
  ];

  const mockPatients = [
    { id: "P-001", name: "Sarah Johnson" },
    { id: "P-002", name: "Michael Smith" },
    { id: "P-003", name: "Emma Davis" }
  ];

  const handleSave = () => {
    if (!notes.trim()) {
      toast("Please enter some notes before saving");
      return;
    }

    // Create new note object
    const newNote: DoctorNote = {
      id: Date.now().toString(),
      content: notes.trim(),
      timestamp: new Date().toLocaleString(),
      linkedTo: linkId && linkName ? { type: linkType, id: linkId, name: linkName } : undefined
    };

    // Save to notes history
    const existingNotes = localStorage.getItem("doctorNotesHistory");
    const notesHistory = existingNotes ? JSON.parse(existingNotes) : [];
    notesHistory.unshift(newNote);
    
    // Keep only last 50 notes
    if (notesHistory.length > 50) {
      notesHistory.splice(50);
    }
    
    localStorage.setItem("doctorNotesHistory", JSON.stringify(notesHistory));

    // Save current notes to localStorage for persistence
    localStorage.setItem("doctorNotes", notes);
    
    toast("Note saved successfully", {
      description: linkId ? `Linked to ${linkType}: ${linkName}` : "Note saved without links"
    });

    // Reset form
    setNotes("");
    setShowLinkSection(false);
    setLinkId("");
    setLinkName("");
  };

  const handleLoad = () => {
    const savedNotes = localStorage.getItem("doctorNotes");
    if (savedNotes) {
      setNotes(savedNotes);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    handleLoad();
  };

  const handleLinkSelect = (value: string, type: 'case' | 'task' | 'patient') => {
    setLinkId(value);
    
    let mockData;
    switch (type) {
      case 'case':
        mockData = mockCases;
        break;
      case 'task':
        mockData = mockTasks;
        break;
      case 'patient':
        mockData = mockPatients;
        break;
    }
    
    const selectedItem = mockData.find(item => item.id === value);
    if (selectedItem) {
      setLinkName(selectedItem.name);
    }
  };

  const clearLink = () => {
    setLinkId("");
    setLinkName("");
  };

  if (!isOpen) {
    return (
      <Button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-healthcare-primary hover:bg-healthcare-accent z-50"
        size="icon"
      >
        <NotepadText className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 z-50 shadow-lg transition-all duration-200 ${
      isMinimized ? "w-80 h-12" : "w-80 h-auto max-h-[600px]"
    }`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 cursor-pointer" 
                  onClick={() => setIsMinimized(!isMinimized)}>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <NotepadText className="h-4 w-4" />
          Doctor Notes
        </CardTitle>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(!isMinimized);
            }}
          >
            {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      
      {!isMinimized && (
        <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
          <Textarea
            placeholder="Take quick notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[150px] resize-none"
          />
          
          {/* Link Section */}
          <div className="space-y-3 border-t pt-3">
            <div className="flex justify-between items-center">
              <Label className="text-sm font-medium">Link to:</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLinkSection(!showLinkSection)}
                className="h-6 px-2"
              >
                {showLinkSection ? <Unlink className="h-3 w-3" /> : <Link className="h-3 w-3" />}
              </Button>
            </div>
            
            {showLinkSection && (
              <div className="space-y-2">
                <Select value={linkType} onValueChange={(value: 'case' | 'task' | 'patient') => setLinkType(value)}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="case">Case</SelectItem>
                    <SelectItem value="task">Task</SelectItem>
                    <SelectItem value="patient">Patient</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={linkId} onValueChange={(value) => handleLinkSelect(value, linkType)}>
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder={`Select ${linkType}...`} />
                  </SelectTrigger>
                  <SelectContent>
                    {(linkType === 'case' ? mockCases : linkType === 'task' ? mockTasks : mockPatients).map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.id} - {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {linkId && (
                  <div className="flex items-center justify-between text-xs text-muted-foreground bg-muted p-2 rounded">
                    <span>Linked to: {linkType} - {linkName}</span>
                    <Button variant="ghost" size="sm" onClick={clearLink} className="h-4 w-4 p-0">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={handleLoad}>
              Load
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-3 w-3 mr-1" />
              Save Note
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
