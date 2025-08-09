
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Search } from "lucide-react";

const linkCaseSchema = z.object({
  caseId: z.string().min(1, "Case ID is required"),
  linkBidirectional: z.boolean().default(true),
});

type LinkCaseFormValues = z.infer<typeof linkCaseSchema>;

interface LinkRelatedCaseDialogProps {
  caseData: {
    id: string;
    caseId: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LinkRelatedCaseDialog({ caseData, open, onOpenChange }: LinkRelatedCaseDialogProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{id: string, caseId: string, subject: string}>>([]);
  
  const form = useForm<LinkCaseFormValues>({
    resolver: zodResolver(linkCaseSchema),
    defaultValues: {
      caseId: "",
      linkBidirectional: true,
    },
  });

  const handleSearch = () => {
    // In a real application, this would be an API call to search for cases
    // For demo purposes, we'll just show some fake results
    if (searchTerm.length > 0) {
      setSearchResults([
        { id: "c1234", caseId: "CSE-1234", subject: "Medication inquiry for Smith" },
        { id: "c1235", caseId: "CSE-1235", subject: "Insurance claim rejection" },
        { id: "c1236", caseId: "CSE-1236", subject: "Post-surgery follow up inquiry" },
      ]);
    } else {
      setSearchResults([]);
    }
  };

  const selectCase = (id: string) => {
    form.setValue("caseId", id);
  };

  const onSubmit = (data: LinkCaseFormValues) => {
    // In a real application, you would make an API call here
    console.log("Linking cases:", {
      sourceCaseId: caseData.id,
      targetCaseId: data.caseId,
      bidirectional: data.linkBidirectional
    });
    
    toast("Cases linked", {
      description: `Case #${caseData.caseId} linked to #${data.caseId}.`,
    });
    
    onOpenChange(false);
    
    // Force refresh the current page to show updates
    navigate(0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Link Related Case</DialogTitle>
          <DialogDescription>
            Link case #{caseData.caseId} to another related case
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="text"
              placeholder="Search cases by ID or subject..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="button" onClick={handleSearch}>Search</Button>
        </div>
        
        {searchResults.length > 0 && (
          <div className="border rounded-md divide-y max-h-60 overflow-auto">
            {searchResults.map((result) => (
              <div 
                key={result.id} 
                className="p-3 hover:bg-muted cursor-pointer"
                onClick={() => selectCase(result.caseId)}
              >
                <div className="font-medium">{result.subject}</div>
                <div className="text-sm text-muted-foreground">#{result.caseId}</div>
              </div>
            ))}
          </div>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="caseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Case ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter case ID (e.g. CSE-1234)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="linkBidirectional"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Bidirectional Link
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Link will appear on both cases
                    </p>
                  </div>
                </FormItem>
              )}
            />
            
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button variant="outline" type="button">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={!form.getValues().caseId}>Link Cases</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
