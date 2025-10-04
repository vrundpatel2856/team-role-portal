import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const EmployeeDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    expenseDate: "",
    category: "",
    paidBy: "",
    remarks: "",
    amount: "",
    currency: "USD",
    descriptionLong: "",
    status: "Draft",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setRequests([
      ...requests,
      {
        id: Date.now(),
        employee: "Sarah",
        ...formData,
        status: "Waiting Approval",
      },
    ]);
    setOpenForm(false);
  };

  return (<>
   <h1 className="text-3xl font-bold text-gray-800 pl-10 pt-8">  Employee's  View</h1>
    <div className="flex min-h-screen w-full bg-background">
      
      <main className="flex-1 p-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">
              Employee's View – Expense Submissions
            </CardTitle>
          </CardHeader>

          <CardContent>
            {/* Buttons */}
            <div className="flex gap-2 mb-4">
              <Button variant="outline" asChild>
                <label className="cursor-pointer">
                  Upload
                  <input type="file" className="hidden" />
                </label>
              </Button>
              <Button onClick={() => setOpenForm(true)}>New</Button>
            </div>

            {/* Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Employee</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Paid By</TableHead>
                    <TableHead>Remarks</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((req) => (
                    <TableRow key={req.id}>
                      <TableCell>{req.employee}</TableCell>
                      <TableCell>{req.description}</TableCell>
                      <TableCell>{req.expenseDate}</TableCell>
                      <TableCell>{req.category}</TableCell>
                      <TableCell>{req.paidBy}</TableCell>
                      <TableCell>{req.remarks}</TableCell>
                      <TableCell>
                        {req.amount} {req.currency}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={req.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Popup Form */}
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm">
                Attach Receipt
              </Button>
              <p className="text-sm text-muted-foreground">
                Draft &gt; Waiting Approval &gt; Approved
              </p>
            </div>
          </DialogHeader>

          {/* Form Fields */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            <Input
              type="date"
              name="expenseDate"
              value={formData.expenseDate}
              onChange={handleChange}
            />
            <Input
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
            />
            <Input
              name="paidBy"
              placeholder="Paid By"
              value={formData.paidBy}
              onChange={handleChange}
            />
            <Input
              name="remarks"
              placeholder="Remarks"
              value={formData.remarks}
              onChange={handleChange}
            />
            <div className="flex gap-2">
              <Input
                name="amount"
                type="number"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
              />
              <Select
                value={formData.currency}
                onValueChange={(val) =>
                  setFormData((prev) => ({ ...prev, currency: val }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="INR">INR</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4">
            <Textarea
              name="descriptionLong"
              placeholder="Detailed Description"
              value={formData.descriptionLong}
              onChange={handleChange}
            />
          </div>

          {/* Footer */}
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div></>
  );
};

export default EmployeeDashboard;
