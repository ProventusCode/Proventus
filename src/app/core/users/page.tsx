"use client";

import { useState } from "react";
import { Trash2, UserPlus, Edit, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface User {
  id: number;
  name: string;
  email: string;
  university: string;
  role: "Admin" | "Profesor" | "Estudiante";
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Ana García",
      email: "ana@universidad.edu",
      university: "Universidad A",
      role: "Admin",
    },
    {
      id: 2,
      name: "Carlos López",
      email: "carlos@universidad.edu",
      university: "Universidad B",
      role: "Profesor",
    },
    {
      id: 3,
      name: "María Rodríguez",
      email: "maria@universidad.edu",
      university: "Universidad C",
      role: "Estudiante",
    },
  ]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleRoleChange = (
    id: number,
    newRole: "Admin" | "Profesor" | "Estudiante"
  ) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, role: newRole } : user))
    );
  };

  const handleSaveUser = (user: User) => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      setUsers([...users, { ...user, id: users.length + 1 }]);
    }
    setEditingUser(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Gestión de usuarios</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button onClick={() => setEditingUser(null)}>
              <UserPlus className="mr-2 h-4 w-4" /> Agregar usuario
            </Button>
          </SheetTrigger>
          <SheetContent>
            <UserForm user={editingUser} onSave={handleSaveUser} />
          </SheetContent>
        </Sheet>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Correo</TableHead>
              <TableHead>Universidad</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.university}</TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onValueChange={(
                      value: "Admin" | "Profesor" | "Estudiante"
                    ) => handleRoleChange(user.id, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Profesor">Profesor</SelectItem>
                      <SelectItem value="Estudiante">Estudiante</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setEditingUser(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <UserForm user={user} onSave={handleSaveUser} />
                      </SheetContent>
                    </Sheet>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

interface UserFormProps {
  user: User | null;
  onSave: (user: User) => void;
}

function UserForm({ user, onSave }: UserFormProps) {
  const [formData, setFormData] = useState<User>(
    user || { id: 0, name: "", email: "", university: "", role: "Estudiante" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <SheetHeader>
        <SheetTitle>{user ? "Editar Usuario" : "Agregar Usuario"}</SheetTitle>
      </SheetHeader>
      <Input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      <Input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Correo"
        required
      />
      <Input
        name="university"
        value={formData.university}
        onChange={handleChange}
        placeholder="Universidad"
        required
      />
      <Select
        value={formData.role}
        onValueChange={(value: "Admin" | "Profesor" | "Estudiante") =>
          setFormData({ ...formData, role: value })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Seleccionar rol" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Admin">Admin</SelectItem>
          <SelectItem value="Profesor">Profesor</SelectItem>
          <SelectItem value="Estudiante">Estudiante</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" className="w-full">
        {user ? "Guardar Cambios" : "Agregar Usuario"}
      </Button>
    </form>
  );
}
