
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart4, LineChart, PieChart, ChevronDown, Download, RefreshCw, Loader2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const PowerBIReporting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState("patient-satisfaction");

  const handleRefresh = () => {
    setIsLoading(true);
    // In a real application, this would refresh the data from the API
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Power BI Reporting</h1>
          <p className="text-muted-foreground mt-1">
            Advanced analytics and visualization for healthcare data
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isLoading}>
            {isLoading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
            Refresh
          </Button>
          <Button variant="default">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,254</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <span className="text-healthcare-success mr-1">↑ 12%</span>
                vs. last quarter
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Patient Satisfaction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8/5</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <span className="text-healthcare-success mr-1">↑ 0.3</span>
                vs. last quarter
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Case Resolution Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">16.4 hrs</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <span className="text-healthcare-success mr-1">↓ 22%</span>
                vs. last quarter
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <CardTitle>Patient Engagement Analytics</CardTitle>
                <CardDescription>Patient interactions across channels</CardDescription>
              </div>
              <div className="flex gap-2">
                <Select defaultValue="last-30-days">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                    <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                    <SelectItem value="last-90-days">Last Quarter</SelectItem>
                    <SelectItem value="last-365-days">Last Year</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all-channels">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Filter channels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-channels">All Channels</SelectItem>
                    <SelectItem value="in-person">In Person</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="portal">Patient Portal</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-lg">
              <div className="text-center p-4">
                <LineChart className="h-16 w-16 mx-auto text-muted-foreground/60" />
                <p className="mt-2 text-muted-foreground">Power BI visualization would be embedded here</p>
                <p className="text-sm text-muted-foreground/60">
                  Showing patient interactions across all channels
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Saved Dashboards</CardTitle>
            <CardDescription>Quick access to custom reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                variant={selectedDashboard === "patient-satisfaction" ? "default" : "outline"} 
                className="w-full justify-start" 
                onClick={() => setSelectedDashboard("patient-satisfaction")}
              >
                <BarChart4 className="h-4 w-4 mr-2" />
                Patient Satisfaction
              </Button>
              <Button 
                variant={selectedDashboard === "sla-compliance" ? "default" : "outline"} 
                className="w-full justify-start"
                onClick={() => setSelectedDashboard("sla-compliance")}
              >
                <LineChart className="h-4 w-4 mr-2" />
                SLA Compliance
              </Button>
              <Button 
                variant={selectedDashboard === "case-distribution" ? "default" : "outline"} 
                className="w-full justify-start"
                onClick={() => setSelectedDashboard("case-distribution")}
              >
                <PieChart className="h-4 w-4 mr-2" />
                Case Distribution by Type
              </Button>
              <Button 
                variant={selectedDashboard === "department-metrics" ? "default" : "outline"} 
                className="w-full justify-start"
                onClick={() => setSelectedDashboard("department-metrics")}
              >
                <BarChart4 className="h-4 w-4 mr-2" />
                Department Performance
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Create New Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="visualizations">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
          <TabsTrigger value="raw-data">Raw Data</TabsTrigger>
          <TabsTrigger value="export">Export Options</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visualizations" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Satisfaction by Department</CardTitle>
                <CardDescription>Average CSAT scores across hospital departments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-lg">
                  <div className="text-center p-4">
                    <BarChart4 className="h-16 w-16 mx-auto text-muted-foreground/60" />
                    <p className="mt-2 text-muted-foreground">Power BI visualization would be embedded here</p>
                    <p className="text-sm text-muted-foreground/60">
                      Showing CSAT scores by department
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Case Resolution Time Trend</CardTitle>
                <CardDescription>Average time to resolve cases over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border-2 border-dashed rounded-lg">
                  <div className="text-center p-4">
                    <LineChart className="h-16 w-16 mx-auto text-muted-foreground/60" />
                    <p className="mt-2 text-muted-foreground">Power BI visualization would be embedded here</p>
                    <p className="text-sm text-muted-foreground/60">
                      Showing resolution time trends
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="raw-data" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Raw Data Export</CardTitle>
                  <CardDescription>View and export the underlying data</CardDescription>
                </div>
                <Input 
                  placeholder="Search data..."
                  className="max-w-sm"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Case Type</TableHead>
                      <TableHead>Resolution Time (hrs)</TableHead>
                      <TableHead>CSAT Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <TableRow key={i}>
                        <TableCell>2023-04-{10 + i}</TableCell>
                        <TableCell>Cardiology</TableCell>
                        <TableCell>Medical Inquiry</TableCell>
                        <TableCell>{12 + i * 2}</TableCell>
                        <TableCell>{4.5 + (i % 3) * 0.1}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                Showing 5 of 142 records
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="export" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
              <CardDescription>Configure and download report exports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Report Format</label>
                    <Select defaultValue="excel">
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excel">Microsoft Excel</SelectItem>
                        <SelectItem value="pdf">PDF Document</SelectItem>
                        <SelectItem value="csv">CSV File</SelectItem>
                        <SelectItem value="powerbi">Power BI Template</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Time Period</label>
                    <Select defaultValue="last-30-days">
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last-7-days">Last 7 Days</SelectItem>
                        <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                        <SelectItem value="last-90-days">Last Quarter</SelectItem>
                        <SelectItem value="last-365-days">Last Year</SelectItem>
                        <SelectItem value="custom">Custom Range</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Data to Include</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="patient-data" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="patient-data">Patient Demographics</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="case-data" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="case-data">Case Metrics</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="satisfaction-data" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="satisfaction-data">Satisfaction Scores</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="department-data" className="rounded border-gray-300" />
                      <label htmlFor="department-data">Department Breakdown</label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Schedule Report</label>
                  <Select defaultValue="no">
                    <SelectTrigger>
                      <SelectValue placeholder="Set schedule" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">One-time download</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Recipients</label>
                  <Input placeholder="Enter email addresses (comma separated)" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Generate & Download Report</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PowerBIReporting;
