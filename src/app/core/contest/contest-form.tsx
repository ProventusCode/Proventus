import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import React from "react";

export default function ContestForm() {
  return (
    <div className="grid gap-4 w-[400px] ">
      <div className="space-y-2">
        <Label htmlFor="id">Id</Label>
        <Input id="id" readOnly disabled/>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Nombre</Label>
        <Input id="name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="platform">Plataforma</Label>
        <Input id="platform" />
      </div>

      <div className="space-y-2">
        <div className="grid gap-1.5">
          <Label htmlFor="start">Fecha de inicio</Label>
          <Input id="start" type="datetime-local" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="grid gap-1.5">
          <Label htmlFor="end">Fecha final</Label>
          <Input id="end" type="datetime-local" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="manager">Organizador</Label>
        <Input id="source" />
      </div>

      {/* Numero de Participantes */}
      <div className="space-y-2">
        <Label htmlFor="participants">Participantes</Label>
        <Input id="participants" type="number" />
      </div>
    </div>
  );
}
