import { Badge } from "@/components/ui/badge";
import { ApprovalRequest } from "@/types/user";

interface StatusBadgeProps {
  status: ApprovalRequest["status"];
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const variantMap = {
    pending: "pending" as const,
    approved: "approved" as const,
    rejected: "rejected" as const,
    "in-progress": "inProgress" as const,
  };

  const labelMap = {
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    "in-progress": "In Progress",
  };

  return (
    <Badge variant={variantMap[status]}>
      {labelMap[status]}
    </Badge>
  );
};
