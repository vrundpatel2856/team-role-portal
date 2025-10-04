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
import { StatusBadge } from "@/components/StatusBadge";
import { mockApprovals } from "@/data/mockData";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, FileText } from "lucide-react";
import { toast } from "sonner";

const EmployeeDashboard = () => {
  const { user } = useAuth();

  // Filter to show only current employee's requests (for demo, show all)
  const myRequests = mockApprovals;

  const handleNewRequest = () => {
    toast.success("New request form opened");
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
                  <h1 className="text-2xl font-bold">Employee's View</h1>
                  <p className="text-sm text-muted-foreground">
                    Track your approval requests
                  </p>
                </div>
              </div>
              <Button onClick={handleNewRequest} className="gap-2">
                <Plus className="h-4 w-4" />
                New Request
              </Button>
            </div>
          </header>

          <div className="p-6">
            <Card className="bg-gradient-card shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle>My Approval Requests</CardTitle>
                    <CardDescription>
                      View all your submitted requests and their status
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden bg-background">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold">Request ID</TableHead>
                        <TableHead className="font-semibold">Request Type</TableHead>
                        <TableHead className="font-semibold">Date</TableHead>
                        <TableHead className="font-semibold">Description</TableHead>
                        <TableHead className="font-semibold">Amount</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Approver</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {myRequests.map((request) => (
                        <TableRow key={request.id} className="hover:bg-muted/30">
                          <TableCell className="font-mono text-sm">
                            #{request.id.padStart(4, '0')}
                          </TableCell>
                          <TableCell className="font-medium">{request.requestType}</TableCell>
                          <TableCell>{request.requestDate}</TableCell>
                          <TableCell className="max-w-xs">
                            <p className="truncate">{request.description}</p>
                          </TableCell>
                          <TableCell>{request.amount || "-"}</TableCell>
                          <TableCell>
                            <StatusBadge status={request.status} />
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {request.approver || "Pending"}
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
