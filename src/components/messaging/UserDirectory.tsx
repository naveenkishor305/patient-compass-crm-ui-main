
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  UserCircle,
  Users,
  ClipboardList,
  MessageCircle,
  Filter
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types/user";
import { useUser } from "@/contexts/UserContext";
import { roleDescriptions } from "@/docs/RoleDescriptions";

// Mock directory data
const mockUsers = [
  {
    id: "u1",
    name: "Dr. Jane Smith",
    email: "jane.smith@hospital.com",
    role: "crm_user" as UserRole,
    position: "Patient Support Rep",
    avatar: "",
    lastActive: "Online now",
  },
  {
    id: "u2",
    name: "Dr. Michael Chen",
    email: "m.chen@hospital.com",
    role: "doctor" as UserRole,
    position: "Cardiologist",
    avatar: "",
    lastActive: "5 mins ago",
  },
  {
    id: "u3",
    name: "Dr. Sarah Williams",
    email: "s.williams@hospital.com",
    role: "marketing" as UserRole,
    position: "Marketing Specialist",
    avatar: "",
    lastActive: "1 hour ago",
  },
  {
    id: "u4",
    name: "Dr. Robert Johnson",
    email: "r.johnson@hospital.com",
    role: "doctor" as UserRole,
    position: "Neurologist",
    avatar: "",
    lastActive: "3 hours ago",
  },
  {
    id: "u5",
    name: "Alex Thompson",
    email: "a.thompson@hospital.com",
    role: "crm_user" as UserRole,
    position: "Case Manager",
    avatar: "",
    lastActive: "Yesterday",
  },
  {
    id: "u6",
    name: "Maria Rodriguez",
    email: "m.rodriguez@hospital.com",
    role: "doctor" as UserRole,
    position: "Pediatrician",
    avatar: "",
    lastActive: "Yesterday",
  },
  {
    id: "u7",
    name: "James Wilson",
    email: "j.wilson@hospital.com",
    role: "admin" as UserRole,
    position: "System Administrator",
    avatar: "",
    lastActive: "2 days ago",
  }
];

interface UserDirectoryProps {
  onSelectUser: (user: any) => void;
}

export function UserDirectory({ onSelectUser }: UserDirectoryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([]);
  const { currentUser } = useUser();

  // Filter users based on search query and selected roles
  const filteredUsers = useMemo(() => {
    return mockUsers.filter(user => {
      // Don't show current user in the directory
      if (user.id === currentUser.id) return false;

      // Filter by search query (name, email, position)
      const searchMatch = !searchQuery || 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.position.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by selected roles (if any are selected)
      const roleMatch = selectedRoles.length === 0 || selectedRoles.includes(user.role);

      return searchMatch && roleMatch;
    });
  }, [searchQuery, selectedRoles, currentUser.id]);

  // Toggle role filter
  const toggleRoleFilter = (role: UserRole) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  // Get badge color based on role
  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "admin": return "bg-red-100 text-red-800 hover:bg-red-200";
      case "crm_user": return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "doctor": return "bg-green-100 text-green-800 hover:bg-green-200";
      case "marketing": return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  // Get icon based on role
  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "admin": return <ClipboardList className="h-4 w-4" />;
      case "crm_user": return <MessageCircle className="h-4 w-4" />;
      case "doctor": return <UserCircle className="h-4 w-4" />;
      case "marketing": return <Users className="h-4 w-4" />;
      default: return <UserCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by name, email or position..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-2">
          {selectedRoles.map(role => (
            <Badge 
              key={role}
              variant="outline"
              className={getRoleBadgeColor(role)}
              onClick={() => toggleRoleFilter(role)}
            >
              {getRoleIcon(role)}
              <span className="ml-1">{roleDescriptions[role].title}</span>
              <button className="ml-1 hover:text-foreground" onClick={(e) => {
                e.stopPropagation();
                toggleRoleFilter(role);
              }}>×</button>
            </Badge>
          ))}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter Roles
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter by role</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {(Object.keys(roleDescriptions) as UserRole[]).map((role) => (
              <DropdownMenuItem key={role} onSelect={(e) => {
                e.preventDefault();
                toggleRoleFilter(role);
              }}>
                <div className="flex items-center gap-2">
                  <Checkbox 
                    checked={selectedRoles.includes(role)} 
                    onCheckedChange={() => toggleRoleFilter(role)}
                    id={`role-${role}`}
                  />
                  <label 
                    htmlFor={`role-${role}`}
                    className="flex items-center gap-2 text-sm cursor-pointer flex-1"
                  >
                    {getRoleIcon(role)}
                    {roleDescriptions[role].title}
                  </label>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border rounded-md overflow-hidden">
        {filteredUsers.length > 0 ? (
          <div className="divide-y">
            {filteredUsers.map((user) => (
              <div 
                key={user.id}
                className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onSelectUser(user)}
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-muted-foreground/20 flex items-center justify-center">
                    <UserCircle className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium truncate">{user.name}</h4>
                      <span className="text-xs text-muted-foreground">{user.lastActive}</span>
                    </div>
                    <div className="text-sm text-muted-foreground truncate">{user.position}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge 
                        variant="outline"
                        className={getRoleBadgeColor(user.role)}
                      >
                        {getRoleIcon(user.role)}
                        <span className="ml-1">{roleDescriptions[user.role].title}</span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No users match your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
