
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserDirectory } from "@/components/messaging/UserDirectory";
import { ConversationList } from "@/components/messaging/ConversationList";
import { MessageThread } from "@/components/messaging/MessageThread";
import { useUser } from "@/contexts/UserContext";
import { MessageDialog } from "@/components/messaging/MessageDialog";
import { Button } from "@/components/ui/button";

const Messages = () => {
  const [activeTab, setActiveTab] = useState<string>("inbox");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { currentUser } = useUser();

  const handleUserSelect = (user: any) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground mt-1">
            Manage your conversations with patients and healthcare providers
          </p>
        </div>
        
        {/* Quick access button if a user is already selected */}
        {selectedUser && (
          <Button 
            variant="outline" 
            onClick={() => setDialogOpen(true)}
          >
            Resume chat with {selectedUser.name}
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-1 space-y-6">
          <Tabs defaultValue="inbox" onValueChange={setActiveTab} value={activeTab}>
            <TabsList className="w-full">
              <TabsTrigger value="inbox" className="flex-1">Inbox</TabsTrigger>
              <TabsTrigger value="directory" className="flex-1">Directory</TabsTrigger>
            </TabsList>

            <TabsContent value="inbox" className="p-0 border-0">
              <ConversationList onSelectUser={handleUserSelect} />
            </TabsContent>

            <TabsContent value="directory" className="p-0 border-0">
              <UserDirectory onSelectUser={handleUserSelect} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-2">
          {selectedUser ? (
            <MessageThread currentUser={currentUser} recipient={selectedUser} />
          ) : (
            <div className="h-[500px] flex items-center justify-center border rounded-lg bg-muted/20">
              <div className="text-center">
                <h3 className="font-medium text-lg">No conversation selected</h3>
                <p className="text-muted-foreground mt-1">
                  Select a user from your inbox or directory to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message Dialog */}
      {selectedUser && (
        <MessageDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          currentUser={currentUser}
          recipient={selectedUser}
        />
      )}
    </div>
  );
};

export default Messages;
