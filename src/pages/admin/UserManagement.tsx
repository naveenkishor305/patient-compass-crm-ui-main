import { useState } from "react";
import { BackNavigationHeader } from "@/components/navigation/BackNavigationHeader";
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
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Search, UserPlus, Edit, Trash2, UserCheck, UserX } from "lucide-react";
import { UserRole } from "@/types/user";

// Define a type for the user
interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  position: string;
  status: "active" | "inactive"; // Explicitly define the status type
  lastLogin: string;
}

// Mock user data - in a real app, this would come from an API
const mockUsers: UserData[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "admin",
    position: "System Administrator",
    status: "active",
    lastLogin: "2023-05-01T10:30:00",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "crm_user",
    position: "Support Representative",
    status: "active",
    lastLogin: "2023-05-02T09:15:00",
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol@example.com",
    role: "doctor",
    position: "Cardiologist",
    status: "inactive",
    lastLogin: "2023-04-15T14:20:00",
  },
  {
    id: "4",
    name: "David Miller",
    email: "david@example.com",
    role: "marketing",
    position: "Marketing Specialist",
    status: "active",
    lastLogin: "2023-05-03T11:45:00",
  },
  {
    id: "5",
    name: "Eva Rodriguez",
    email: "eva@example.com",
    role: "crm_user",
    position: "Customer Support Lead",
    status: "active",
    lastLogin: "2023-05-02T16:30:00",
  },
];

// Form schema
const userFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  role: z.enum(["admin", "crm_user", "doctor", "marketing"], {
    required_error: "Please select a role.",
  }),
  position: z.string().min(2, { message: "Position is required." }),
  status: z.enum(["active", "inactive"], {
    required_error: "Please select a status.",
  }),
});

// Define a type for the form data
type UserFormData = z.infer<typeof userFormSchema>;

const UserManagement = () => {
  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | undefined>();
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [editUser, setEditUser] = useState<UserData | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "crm_user",
      position: "",
      status: "active",
    },
  });

  // Filter users based on search term, role and status
  const filteredUsers = users.filter((user) => {
    const matchesSearchTerm =
      searchTerm === "" ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = !roleFilter || user.role === roleFilter;
    const matchesStatus = !statusFilter || user.status === statusFilter;

    return matchesSearchTerm && matchesRole && matchesStatus;
  });

  const handleAddUser = (data: UserFormData) => {
    const newUser: UserData = {
      id: (users.length + 1).toString(),
      name: data.name,
      email: data.email,
      role: data.role,
      position: data.position,
      status: data.status, // Now properly typed as "active" | "inactive"
      lastLogin: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
    setAddUserDialogOpen(false);
    form.reset();
    toast({
      title: "User added successfully",
      description: `${newUser.name} has been added as a ${newUser.role}`,
    });
  };

  const handleEditUser = (user: UserData) => {
    setEditUser(user);
    form.reset({
      name: user.name,
      email: user.email,
      role: user.role,
      position: user.position,
      status: user.status,
    });
    setAddUserDialogOpen(true);
  };

  const handleUpdateUser = (data: UserFormData) => {
    if (!editUser) return;
    
    const updatedUsers = users.map((user) =>
      user.id === editUser.id ? { 
        ...user, 
        name: data.name,
        email: data.email,
        role: data.role,
        position: data.position,
        status: data.status
      } : user
    );
    
    setUsers(updatedUsers);
    setAddUserDialogOpen(false);
    setEditUser(null);
    form.reset();
    toast({
      title: "User updated successfully",
      description: `${data.name}'s information has been updated`,
    });
  };

  const confirmDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteUser = () => {
    if (!userToDelete) return;
    
    const updatedUsers = users.filter((user) => user.id !== userToDelete);
    const deletedUser = users.find((user) => user.id === userToDelete);
    setUsers(updatedUsers);
    setDeleteDialogOpen(false);
    
    if (deletedUser) {
      toast({
        title: "User deleted",
        description: `${deletedUser.name} has been removed from the system`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <BackNavigationHeader title="User Management" />

      <div className="flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center">
        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Select
              value={roleFilter}
              onValueChange={(value) => setRoleFilter(value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="crm_user">CRM User</SelectItem>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={() => {
          setEditUser(null);
          form.reset({
            name: "",
            email: "",
            role: "crm_user",
            position: "",
            status: "active",
          });
          setAddUserDialogOpen(true);
        }} className="flex items-center gap-1">
          <UserPlus className="h-4 w-4" />
          Add User
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Users</CardTitle>
          <CardDescription>
            Manage user accounts and access permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No users match your search criteria
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`${
                            user.role === "admin"
                              ? "bg-blue-100 text-blue-800"
                              : user.role === "doctor"
                              ? "bg-green-100 text-green-800"
                              : user.role === "marketing"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {user.role.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.position}</TableCell>
                      <TableCell>
                        {user.status === "active" ? (
                          <Badge className="bg-green-100 text-green-800">
                            Active
                          </Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => confirmDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const updatedUsers = users.map((u) =>
                              u.id === user.id
                                ? {
                                    ...u,
                                    status:
                                      u.status === "active"
                                        ? "inactive" as const
                                        : "active" as const,
                                  }
                                : u
                            );
                            setUsers(updatedUsers);
                            toast({
                              title: `User ${
                                user.status === "active"
                                  ? "deactivated"
                                  : "activated"
                              }`,
                              description: `${user.name} has been ${
                                user.status === "active"
                                  ? "deactivated"
                                  : "activated"
                              }`,
                            });
                          }}
                        >
                          {user.status === "active" ? (
                            <UserX className="h-4 w-4" />
                          ) : (
                            <UserCheck className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {user.status === "active" ? "Deactivate" : "Activate"}
                          </span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit User Dialog */}
      <Dialog open={addUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editUser ? "Edit User" : "Add New User"}
            </DialogTitle>
            <DialogDescription>
              {editUser
                ? "Update user details and permissions"
                : "Create a new user account"}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                editUser ? handleUpdateUser : handleAddUser
              )}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="user@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="crm_user">CRM User</SelectItem>
                          <SelectItem value="doctor">Doctor</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="position"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Position</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Job title or position"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setAddUserDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editUser ? "Save Changes" : "Add User"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteUser}
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
