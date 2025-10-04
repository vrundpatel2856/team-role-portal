import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { mockApprovals } from "@/data/mockData";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Search, Filter, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { ApprovalRequest } from "@/types/user";

const Approvals = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [approvals, setApprovals] = useState(mockApprovals);

  const filteredApprovals = approvals.filter((approval) => {
    const matchesSearch =
      approval.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      approval.requestType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || approval.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id: string) => {
    setApprovals((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "approved" as ApprovalRequest["status"], approver: user?.name } : a
      )
    );
    toast.success("Request approved successfully");
  };

  const handleReject = (id: string) => {
    setApprovals((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "rejected" as ApprovalRequest["status"], approver: user?.name } : a
      )
    );
    toast.error("Request rejected");
  };

  const canManageApprovals = user?.role === "manager" || user?.role === "admin";

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold">Approval Requests</h1>
                <p className="text-sm text-muted-foreground">
                  {canManageApprovals ? "Review and manage requests" : "View your requests"}
                </p>
              </div>
            </div>
          </header>

          <div className="p-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle>All Requests</CardTitle>
                    <CardDescription>
                      {filteredApprovals.length} request(s) found
                    </CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search requests..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 w-full sm:w-64"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-40">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Employee</TableHead>
                        <TableHead>Request Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        {canManageApprovals && <TableHead>Actions</TableHead>}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApprovals.map((approval) => (
                        <TableRow key={approval.id} className="hover:bg-muted/30">
                          <TableCell className="font-medium">
                            <div>
                              <p>{approval.employeeName}</p>
                              <p className="text-xs text-muted-foreground">
                                {approval.employeeId}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{approval.requestType}</TableCell>
                          <TableCell>{approval.requestDate}</TableCell>
                          <TableCell className="max-w-xs truncate">
                            {approval.description}
                          </TableCell>
                          <TableCell>{approval.amount || "-"}</TableCell>
                          <TableCell>
                            <StatusBadge status={approval.status} />
                          </TableCell>
                          {canManageApprovals && (
                            <TableCell>
                              {approval.status === "pending" && (
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleApprove(approval.id)}
                                    className="border-success text-success hover:bg-success hover:text-success-foreground"
                                  >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleReject(approval.id)}
                                    className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                </div>
                              )}
                              {approval.status !== "pending" && approval.approver && (
                                <p className="text-xs text-muted-foreground">
                                  By {approval.approver}
                                </p>
                              )}
                            </TableCell>
                          )}
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

export default Approvals;
