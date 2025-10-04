import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Users as UsersIcon, Shield, User } from "lucide-react";

const Users = () => {
  const users = [
    { id: "EMP001", name: "John Smith", email: "john.smith@company.com", role: "employee" },
    { id: "EMP002", name: "Sarah Johnson", email: "sarah.j@company.com", role: "employee" },
    { id: "MGR001", name: "Michael Brown", email: "m.brown@company.com", role: "manager" },
    { id: "EMP003", name: "Emily Davis", email: "emily.d@company.com", role: "employee" },
    { id: "ADM001", name: "David Wilson", email: "d.wilson@company.com", role: "admin" },
    { id: "EMP004", name: "Lisa Anderson", email: "l.anderson@company.com", role: "employee" },
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="h-4 w-4" />;
      case "manager":
        return <UsersIcon className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge variant="destructive">Admin</Badge>;
      case "manager":
        return <Badge variant="default">Manager</Badge>;
      default:
        return <Badge variant="secondary">Employee</Badge>;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger />
              <div>
                <h1 className="text-2xl font-bold">User Management</h1>
                <p className="text-sm text-muted-foreground">
                  Manage users and their roles
                </p>
              </div>
            </div>
          </header>

          <div className="p-6">
            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>{users.length} users in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id} className="hover:bg-muted/30">
                          <TableCell className="font-mono text-sm">{user.id}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getRoleIcon(user.role)}
                              <span className="font-medium">{user.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{user.email}</TableCell>
                          <TableCell>{getRoleBadge(user.role)}</TableCell>
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

export default Users;
