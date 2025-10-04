import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { mockApprovals } from "@/data/mockData";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";

const EmployeeDashboard = () => {
  const { user } = useAuth();

  // Filter to show only current employee's requests (for demo, show all)
  const myRequests = mockApprovals;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 bg-background">
          <header className="border-b bg-background">
            <div className="flex h-14 items-center px-6">
              <SidebarTrigger />
              <h1 className="ml-4 text-lg font-semibold">Employee's View</h1>
            </div>
          </header>

          <div className="p-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium">
                  Your approval requests history for past 6 months of calendar year date to current date {new Date().getFullYear()}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  (Expand the detailed list of the employee and approvals selected)
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="w-[120px]">Employee Name</TableHead>
                        <TableHead className="w-[100px]">Request ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Request Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Approver</TableHead>
                        <TableHead className="w-[100px]">Priority</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {myRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.employeeName}</TableCell>
                          <TableCell className="font-mono text-xs">
                            #{request.id.padStart(4, '0')}
                          </TableCell>
                          <TableCell className="text-sm">{request.requestDate}</TableCell>
                          <TableCell>{request.requestType}</TableCell>
                          <TableCell>{request.amount || "-"}</TableCell>
                          <TableCell className="max-w-[200px]">
                            <p className="truncate text-sm">{request.description}</p>
                          </TableCell>
                          <TableCell>
                            <StatusBadge status={request.status} />
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {request.approver || "-"}
                          </TableCell>
                          <TableCell>
                            <span className="text-xs capitalize">{request.priority}</span>
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

export default EmployeeDashboard;
