import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { ApprovalRequest } from "@/types/user";

const ManagerDashboard = () => {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<"all" | "draft" | "pending" | "approved">("pending");
  const [approvals, setApprovals] = useState(mockApprovals);

  const filteredApprovals = approvals.filter((approval) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "draft") return false; // No draft status in current data
    if (selectedFilter === "pending") return approval.status === "pending";
    if (selectedFilter === "approved") return approval.status === "approved" || approval.status === "rejected";
    return true;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Approval request submitted");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 bg-muted/20">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold">Manager's View</h1>
                <p className="text-sm text-muted-foreground">
                  Review and manage approval requests
                </p>
              </div>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* Create Request Form */}
            <Card className="bg-gradient-card shadow-lg">
              <CardHeader>
                <CardTitle>Create Approval Request</CardTitle>
                <CardDescription>Submit a new approval request</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employee">Employee Name</Label>
                      <Input id="employee" placeholder="Select employee" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="request-type">Request Type</Label>
                      <Select>
                        <SelectTrigger id="request-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="leave">Leave Request</SelectItem>
                          <SelectItem value="expense">Expense Reimbursement</SelectItem>
                          <SelectItem value="training">Training Request</SelectItem>
                          <SelectItem value="equipment">Equipment Request</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (if applicable)</Label>
                      <Input id="amount" type="text" placeholder="$0.00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="priority">Priority</Label>
                      <Select>
                        <SelectTrigger id="priority">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Enter request details..."
                      rows={3}
                    />
                  </div>
                  <Button type="submit" className="w-full md:w-auto">
                    Submit Request
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Filter Buttons and Approvals Table */}
            <Card className="bg-gradient-card shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle>Approvals to Review</CardTitle>
                    <CardDescription>
                      Manage pending approval requests
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedFilter === "all" ? "default" : "outline"}
                    onClick={() => setSelectedFilter("all")}
                    className="gap-2"
                  >
                    All
                  </Button>
                  <Button
                    variant={selectedFilter === "draft" ? "default" : "outline"}
                    onClick={() => setSelectedFilter("draft")}
                    className="gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Draft
                  </Button>
                  <Button
                    variant={selectedFilter === "pending" ? "default" : "outline"}
                    onClick={() => setSelectedFilter("pending")}
                    className="gap-2"
                  >
                    <Clock className="h-4 w-4" />
                    Pending
                  </Button>
                  <Button
                    variant={selectedFilter === "approved" ? "default" : "outline"}
                    onClick={() => setSelectedFilter("approved")}
                    className="gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Approved / Rejected
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden bg-background">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold">Employee Name</TableHead>
                        <TableHead className="font-semibold">Request Type</TableHead>
                        <TableHead className="font-semibold">Date</TableHead>
                        <TableHead className="font-semibold">Amount</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApprovals.map((approval) => (
                        <TableRow key={approval.id} className="hover:bg-muted/30">
                          <TableCell>
                            <div>
                              <p className="font-medium">{approval.employeeName}</p>
                              <p className="text-xs text-muted-foreground">{approval.employeeId}</p>
                            </div>
                          </TableCell>
                          <TableCell>{approval.requestType}</TableCell>
                          <TableCell>{approval.requestDate}</TableCell>
                          <TableCell>{approval.amount || "-"}</TableCell>
                          <TableCell>
                            <StatusBadge status={approval.status} />
                          </TableCell>
                          <TableCell>
                            {approval.status === "pending" ? (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleApprove(approval.id)}
                                  className="bg-success hover:bg-success/90 text-success-foreground"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleReject(approval.id)}
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                {approval.approver ? `By ${approval.approver}` : "Completed"}
                              </span>
                            )}
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

export default ManagerDashboard;
