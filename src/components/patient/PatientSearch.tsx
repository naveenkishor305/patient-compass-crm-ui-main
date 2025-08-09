
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PatientSearchProps {
  onSearch: (query: string, filters: PatientSearchFilters) => void;
}

export interface PatientSearchFilters {
  searchBy: "name" | "crn" | "phone" | "email" | "healthId" | "all";
}

export function PatientSearch({ onSearch }: PatientSearchProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<PatientSearchFilters>({
    searchBy: "all"
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, filters);
  };
  
  const searchPlaceholderMap = {
    name: "Search patients by name...",
    crn: "Search patients by CRN...",
    phone: "Search patients by phone number...",
    email: "Search patients by email...",
    healthId: "Search patients by health ID...",
    all: "Search by CRN, name, contact number, email, or National Health ID..."
  };
  
  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative flex items-center">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder={searchPlaceholderMap[filters.searchBy]}
          className="pl-10 pr-24 bg-white border-gray-200 focus-visible:ring-primary"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="absolute right-2 flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" type="button" className="h-7 w-7 bg-white border-gray-200 hover:bg-gray-50">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="sr-only">Filter</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-4">
                <h4 className="font-medium">Search by</h4>
                <RadioGroup 
                  value={filters.searchBy} 
                  onValueChange={(value) => 
                    setFilters({ ...filters, searchBy: value as PatientSearchFilters["searchBy"] })
                  }
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">All Fields</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="name" id="name" />
                    <Label htmlFor="name">Name</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="crn" id="crn" />
                    <Label htmlFor="crn">CRN</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="phone" id="phone" />
                    <Label htmlFor="phone">Phone Number</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email" />
                    <Label htmlFor="email">Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="healthId" id="healthId" />
                    <Label htmlFor="healthId">Health ID</Label>
                  </div>
                </RadioGroup>
              </div>
            </PopoverContent>
          </Popover>
          <Button type="submit" size="sm">Search</Button>
        </div>
      </div>
    </form>
  );
}
