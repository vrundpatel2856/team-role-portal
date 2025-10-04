import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { toast } from "sonner";
import { CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Mock Data
const mockApprovals = [
  {
    id: "1",
    subject: "Client Lunch",
    owner: "Sarah",
    category: "Food",
    status: "pending",
    amount: "567 $ (in INR) = 49896",
    approver: "",
  },
  {
    id: "2",
    subject: "Office Supplies",
    owner: "Alex",
    category: "Stationary",
    status: "approved",
    amount: "120 $ (in INR) = 9996",
    approver: "Manager1",
  },
];

const ManagerDashboard = () => {
  const { user } = useAuth();
  const [approvals, setApprovals] = useState(mockApprovals);

  const handleApprove = (id: string) => {
    setApprovals((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: "approved", approver: user?.name } : a
      )
    );
    toast.success("Request approved successfully");
  };

  const handleReject = (id: string) => {
    if (confirm("Are you sure you want to reject this request?")) {
      setApprovals((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, status: "rejected", approver: user?.name } : a
        )
      );
      toast.error("Request rejected");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">  Manager's  View</h1>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">
            Approvals to Review
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="font-bold">Approval Subject</TableHead>
                  <TableHead className="font-bold">Request Owner</TableHead>
                  <TableHead className="font-bold">Category</TableHead>
                  <TableHead className="font-bold">Request Status</TableHead>
                  <TableHead className="font-bold">Total Amount</TableHead>
                  <TableHead className="font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvals.map((approval) => (
                  <TableRow
                    key={approval.id}
                    className={`${
                      approval.status === "pending" ? "bg-yellow-50" : ""
                    }`}
                  >
                    <TableCell className="font-semibold">{approval.subject}</TableCell>
                    <TableCell className="font-semibold">{approval.owner}</TableCell>
                    <TableCell className="font-semibold">{approval.category}</TableCell>
                    <TableCell>
                      <StatusBadge status={approval.status} />
                    </TableCell>
                    <TableCell className="font-mono font-semibold">{approval.amount}</TableCell>
                    <TableCell>
                      {approval.status === "pending" ? (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(approval.id)}
                            className="h-8 bg-green-600 hover:bg-green-700 text-white flex items-center gap-1"
                          >
                            <CheckCircle className="h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(approval.id)}
                            className="h-8 flex items-center gap-1"
                          >
                            <XCircle className="h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">
                          {approval.status} by {approval.approver || "Manager"}
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
  );
};

export default ManagerDashboard;
