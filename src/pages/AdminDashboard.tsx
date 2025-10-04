import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const AdminApprovalRules = () => {
  const [formData, setFormData] = useState({
    user: "marc",
    description: "Approval rule for miscellaneous expenses",
    manager: "sarah",
    isManagerApprover: false,
    approvers: [
      { id: 1, name: "John", required: true },
      { id: 2, name: "Mitchell", required: false },
      { id: 3, name: "Andreas", required: false },
    ],
    sequence: false,
    minApproval: 50,
  });

  const toggleApproverRequired = (id: number) => {
    setFormData((prev) => ({
      ...prev,
      approvers: prev.approvers.map((a) =>
        a.id === id ? { ...a, required: !a.required } : a
      ),
    }));
  };

  return (
    <div className="flex min-h-screen w-full bg-background p-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Admin view (Approval rules)</CardTitle>
        </CardHeader>

        <CardContent>
          {/* Two-column layout */}
          <div className="grid grid-cols-2 gap-10">
            {/* LEFT SIDE */}
            <div className="space-y-6">
              {/* User */}
              <div>
                <Label>User</Label>
                <Input value={formData.user} disabled className="mt-1" />
              </div>

              {/* Description */}
              <div>
                <Label>Description about rules</Label>
                <Input
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              {/* Manager */}
              <div>
                <Label>Manager</Label>
                <Select
                  value={formData.manager}
                  onValueChange={(val) =>
                    setFormData({ ...formData, manager: val })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select manager" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah">Sarah</SelectItem>
                    <SelectItem value="john">John</SelectItem>
                    <SelectItem value="mitchell">Mitchell</SelectItem>
                    <SelectItem value="andreas">Andreas</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Dynamic dropdown – default manager is pre-set, but admin can
                  change.
                </p>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">
              {/* Is manager approver */}
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={formData.isManagerApprover}
                  onCheckedChange={(val) =>
                    setFormData({ ...formData, isManagerApprover: !!val })
                  }
                />
                <Label>Is manager an approver?</Label>
              </div>
              <p className="text-xs text-muted-foreground -mt-4">
                If checked, approval first goes to manager before other
                approvers.
              </p>

              {/* Approvers list */}
              <div>
                <Label>Approvers</Label>
                <div className="mt-2 border rounded-md divide-y">
                  {formData.approvers.map((a) => (
                    <div
                      key={a.id}
                      className="flex items-center justify-between px-3 py-2"
                    >
                      <span>
                        {a.id}. {a.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <Label className="text-sm">Required</Label>
                        <Checkbox
                          checked={a.required}
                          onCheckedChange={() => toggleApproverRequired(a.id)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Tick if this approver is required in all scenarios.
                </p>
              </div>

              {/* Sequence */}
              <div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.sequence}
                    onCheckedChange={(val) =>
                      setFormData({ ...formData, sequence: !!val })
                    }
                  />
                  <Label>Approvers Sequence</Label>
                </div>
                <p className="text-xs text-muted-foreground mt-1 pl-4">
                  If ticked: approvals go step by step in sequence.<br/>  
                  If not ticked: all approvers get request simultaneously.<br/>If the required approver rejects the request, then expense request is auto-rejected. <br/> If not ticked then send approver request to all approvers at The same time
                </p>
              </div>

              {/* Minimum approval percentage */}
              <div>
                <Label>Minimum Approval Percentage</Label>
                <Input
                  type="number"
                  value={formData.minApproval}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      minApproval: Number(e.target.value),
                    })
                  }
                  className="mt-1 w-32"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Specify how many approvers (or %) are needed for approval.
                </p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8">
            <Button>Save Rule</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminApprovalRules;18290
