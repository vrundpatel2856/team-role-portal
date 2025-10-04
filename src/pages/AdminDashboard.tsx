import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 bg-background">
          <header className="border-b bg-background">
            <div className="flex h-14 items-center px-6">
              <SidebarTrigger />
              <h1 className="ml-4 text-lg font-semibold">Admin View (Approval routes)</h1>
            </div>
          </header>

          <div className="p-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">
                  Approval routes are the specific sequence of approvals assigned to each employee
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  (Identify the number of approvals assigned to each employee)
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-[100px]">Employee ID</TableHead>
                        <TableHead>Employee Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Approval Steps</TableHead>
                        <TableHead className="w-[100px]">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {approvalRoutes.map((route) => (
                        <TableRow key={route.id}>
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
