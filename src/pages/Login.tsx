import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@/types/user";
import { FileText, User, Users, Shield } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const roles: { value: UserRole; label: string; icon: typeof User; description: string }[] = [
    { value: "employee", label: "Employee", icon: User, description: "Submit and track requests" },
    { value: "manager", label: "Manager", icon: Users, description: "Review and approve requests" },
    { value: "admin", label: "Admin", icon: Shield, description: "Manage system and users" },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole) {
      toast.error("Please select a role");
      return;
    }

    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      await login(email, password, selectedRole);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl bg-gradient-card">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">ApprovalFlow</CardTitle>
          <CardDescription className="text-base">
            Select your role and sign in to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Select Role</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                      selectedRole === role.value
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <Icon className={`h-8 w-8 mx-auto mb-2 ${
                      selectedRole === role.value ? "text-primary" : "text-muted-foreground"
                    }`} />
                    <p className="font-semibold text-sm">{role.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{role.description}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
              />
            </div>
            <Button type="submit" className="w-full h-11 text-base font-semibold" size="lg">
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Demo: Use any email/password combination
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
