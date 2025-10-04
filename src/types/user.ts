export type UserRole = "admin" | "manager" | "employee";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface ApprovalRequest {
  id: string;
  employeeName: string;
  employeeId: string;
  requestType: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected" | "in-progress";
  amount?: string;
  description: string;
  approver?: string;
  priority: "low" | "medium" | "high";
}
