import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { ApprovalRequest } from "@/types/user";

const ManagerDashboard = () => {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<"create" | "draft" | "pending" | "approved">("create");
  const [approvals, setApprovals] = useState(mockApprovals);

  const filteredApprovals = approvals.filter((approval) => {
    if (selectedFilter === "draft") return false; // No draft status in current data
    if (selectedFilter === "pending") return approval.status === "pending";
    if (selectedFilter === "approved") return approval.status === "approved" || approval.status === "rejected";
    return approval.status === "pending"; // default for create view
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
    toast.success("Approval request created");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 bg-background">
          <header className="border-b bg-background">
            <div className="flex h-14 items-center px-6">
              <SidebarTrigger />
              <h1 className="ml-4 text-lg font-semibold">Manager's View</h1>
            </div>
          </header>

          <div className="p-6 space-y-6">
            {/* Filter Buttons */}
            <div className="flex gap-2">
              <Button
                variant={selectedFilter === "create" ? "default" : "outline"}
                onClick={() => setSelectedFilter("create")}
              >
                Create Request
              </Button>
              <Button
                variant={selectedFilter === "draft" ? "default" : "outline"}
                onClick={() => setSelectedFilter("draft")}
              >
                Draft
              </Button>
              <Button
                variant={selectedFilter === "pending" ? "default" : "outline"}
                onClick={() => setSelectedFilter("pending")}
              >
                Pending Approval / Approved
              </Button>
            </div>

            {/* Create Request Form */}
            {selectedFilter === "create" && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium">Create New Approval Request</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="employee">Employee</Label>
                        <Input id="employee" placeholder="Select or search employee" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="manager">Manager</Label>
                        <Input id="manager" placeholder="Select manager" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input id="category" placeholder="Select category" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Input id="priority" placeholder="Select priority" />
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
                    <div className="flex justify-end">
                      <Button type="submit">Submit</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Approvals Table for Pending/Approved Views */}
            {(selectedFilter === "pending" || selectedFilter === "approved") && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-medium">
                    {selectedFilter === "pending" ? "Approvals to Review" : "Approved Requests"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-muted/50">
                          <TableHead>Employee Name</TableHead>
                          <TableHead>Request ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Request Type</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredApprovals.map((approval) => (
                          <TableRow key={approval.id}>
                            <TableCell className="font-medium">{approval.employeeName}</TableCell>
                            <TableCell className="font-mono text-xs">
                              #{approval.id.padStart(4, '0')}
                            </TableCell>
                            <TableCell className="text-sm">{approval.requestDate}</TableCell>
                            <TableCell>{approval.requestType}</TableCell>
                            <TableCell>{approval.amount || "-"}</TableCell>
                            <TableCell className="max-w-[200px]">
                              <p className="truncate text-sm">{approval.description}</p>
                            </TableCell>
                            <TableCell>
                              <StatusBadge status={approval.status} />
                            </TableCell>
                            <TableCell>
                              <span className="text-xs capitalize">{approval.priority}</span>
                            </TableCell>
                            <TableCell>
                              {approval.status === "pending" ? (
                                <div className="flex gap-1">
                                  <Button
                                    size="sm"
                                    onClick={() => handleApprove(approval.id)}
                                    className="h-8 bg-success hover:bg-success/90 text-success-foreground"
                                  >
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Approve
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleReject(approval.id)}
                                    className="h-8"
                                  >
                                    <XCircle className="h-3 w-3 mr-1" />
                                    Reject
                                  </Button>
                                </div>
                              ) : (
                                <span className="text-xs text-muted-foreground">
                                  {approval.approver || "-"}
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
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ManagerDashboard;
