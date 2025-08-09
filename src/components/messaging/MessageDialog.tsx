
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageThread } from "@/components/messaging/MessageThread";
import { Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";

interface MessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentUser: User;
  recipient: any;
}

export function MessageDialog({ open, onOpenChange, currentUser, recipient }: MessageDialogProps) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const toggleFullScreen = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIsFullScreen(!isFullScreen);
      setIsTransitioning(false);
    }, 200);
  };

  // Use Sheet for fullscreen mode and Dialog for regular mode
  if (isFullScreen) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full sm:max-w-full p-0 gap-0 transition-all duration-300 ease-in-out">
          <div className={`flex flex-col h-full transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold">Chat with {recipient?.name}</h3>
              <Button variant="ghost" size="icon" onClick={toggleFullScreen} className="hover:scale-105 transition-transform duration-200">
                <Minimize className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-2 animate-fade-in">
                  <MessageThread currentUser={currentUser} recipient={recipient} />
                </div>
              </ScrollArea>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] p-0 gap-0 transition-all duration-300 ease-in-out">
        <div className={`flex flex-col h-full transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="font-semibold">Chat with {recipient?.name}</h3>
            <Button variant="ghost" size="icon" onClick={toggleFullScreen} className="hover:scale-105 transition-transform duration-200">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 overflow-hidden max-h-[calc(80vh-4rem)]">
            <ScrollArea className="h-full">
              <div className="p-2 animate-fade-in">
                <MessageThread currentUser={currentUser} recipient={recipient} />
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
