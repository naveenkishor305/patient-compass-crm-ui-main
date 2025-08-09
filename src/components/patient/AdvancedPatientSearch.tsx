
import React, { useState } from "react";
import { Search, X, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdvancedPatientSearchProps {
  onSearch: (query: string, filters: SearchFilters) => void;
}

export interface SearchFilters {
  searchBy: string;
  department?: string;
  status?: string;
  dateRange?: string;
  showVipOnly?: boolean;
  showHighRiskOnly?: boolean;
}

export const AdvancedPatientSearch = ({ onSearch }: AdvancedPatientSearchProps) => {
  const [query, setQuery] = useState("");
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    searchBy: "all",
  });

  const handleReset = () => {
    setQuery("");
    setFilters({ searchBy: "all" });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, filters);
  };

  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search patients by name, CRN, email, or health ID..."
          className="pl-10 pr-20"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setQuery("")}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={toggleAdvancedSearch}
          >
            <Filter className="h-4 w-4" />
            <span className="sr-only">
              {showAdvancedSearch ? "Hide filters" : "Show filters"}
            </span>
          </Button>
        </div>
      </form>

      {showAdvancedSearch && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Search By
                </label>
                <Select
                  value={filters.searchBy}
                  onValueChange={(value) => updateFilter("searchBy", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Field to search" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Fields</SelectItem>
                    <SelectItem value="name">Patient Name</SelectItem>
                    <SelectItem value="crn">CRN</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone Number</SelectItem>
                    <SelectItem value="healthId">Health ID</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Department
                </label>
                <Select
                  value={filters.department}
                  onValueChange={(value) => updateFilter("department", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="oncology">Oncology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="surgery">Surgery</SelectItem>
                    <SelectItem value="internal">Internal Medicine</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Status
                </label>
                <Select
                  value={filters.status}
                  onValueChange={(value) => updateFilter("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="discharged">Discharged</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Date Range
                </label>
                <Select
                  value={filters.dateRange}
                  onValueChange={(value) => updateFilter("dateRange", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                    <SelectItem value="last-year">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="vip-only"
                    className="rounded border-gray-300"
                    checked={filters.showVipOnly}
                    onChange={(e) => updateFilter("showVipOnly", e.target.checked)}
                  />
                  <label htmlFor="vip-only">VIP Patients Only</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="high-risk-only"
                    className="rounded border-gray-300"
                    checked={filters.showHighRiskOnly}
                    onChange={(e) => updateFilter("showHighRiskOnly", e.target.checked)}
                  />
                  <label htmlFor="high-risk-only">High Risk Patients Only</label>
                </div>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  className="w-full sm:w-auto"
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  onClick={handleSearch}
                  className="w-full sm:w-auto"
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
