import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Route, Plus, Users, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface ApprovalRoute {
  id: string;
  employeeName: string;
  employeeId: string;
  department: string;
  approvalSteps: string[];
  status: "active" | "inactive";
}

const AdminDashboard = () => {
  const approvalRoutes: ApprovalRoute[] = [
    {
      id: "1",
      employeeName: "John Smith",
      employeeId: "EMP001",
      department: "Engineering",
      approvalSteps: ["Team Lead", "Department Manager", "Finance", "CEO"],
      status: "active",
    },
    {
      id: "2",
      employeeName: "Sarah Johnson",
      employeeId: "EMP002",
      department: "Sales",
      approvalSteps: ["Sales Manager", "Finance"],
      status: "active",
    },
    {
      id: "3",
      employeeName: "Michael Brown",
      employeeId: "EMP003",
      department: "Marketing",
      approvalSteps: ["Marketing Lead", "CMO", "Finance"],
      status: "active",
    },
    {
      id: "4",
      employeeName: "Emily Davis",
      employeeId: "EMP004",
      department: "HR",
      approvalSteps: ["HR Manager", "Finance"],
      status: "active",
    },
    {
      id: "5",
      employeeName: "David Wilson",
      employeeId: "EMP005",
      department: "Engineering",
      approvalSteps: ["Team Lead", "Department Manager"],
      status: "inactive",
    },
  ];

  const handleCreateRoute = () => {
    toast.success("Create new approval route");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 bg-muted/20">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <div>
                  <h1 className="text-2xl font-bold">Admin View</h1>
                  <p className="text-sm text-muted-foreground">
                    Manage approval routes and system configuration
                  </p>
                </div>
              </div>
              <Button onClick={handleCreateRoute} className="gap-2">
                <Plus className="h-4 w-4" />
                New Approval Route
              </Button>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="bg-gradient-card shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Routes
                  </CardTitle>
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Route className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{approvalRoutes.length}</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Routes
                  </CardTitle>
                  <div className="p-2 rounded-lg bg-success/10">
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {approvalRoutes.filter((r) => r.status === "active").length}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Employees
                  </CardTitle>
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{approvalRoutes.length}</div>
                </CardContent>
              </Card>
            </div>

            {/* Approval Routes Table */}
            <Card className="bg-gradient-card shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Route className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle>Approval Routes</CardTitle>
                    <CardDescription>
                      Configure approval workflows for each employee
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden bg-background">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold">Employee ID</TableHead>
                        <TableHead className="font-semibold">Employee Name</TableHead>
                        <TableHead className="font-semibold">Department</TableHead>
                        <TableHead className="font-semibold">Approval Steps</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {approvalRoutes.map((route) => (
                        <TableRow key={route.id} className="hover:bg-muted/30">
                          <TableCell className="font-mono text-sm">
                            {route.employeeId}
                          </TableCell>
                          <TableCell className="font-medium">{route.employeeName}</TableCell>
                          <TableCell>{route.department}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {route.approvalSteps.map((step, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {index + 1}. {step}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={route.status === "active" ? "success" : "secondary"}
                            >
                              {route.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                Edit
                              </Button>
                              <Button size="sm" variant="outline">
                                View
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
