import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TaskFormProps = {
  onAgregarTarea: (title: string, description: string) => void;
};

export const TaskForm = ({ onAgregarTarea }: TaskFormProps) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAgregarTarea(titulo, descripcion);
    setTitulo("");
    setDescripcion("");
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Nueva Tarea</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Título de la tarea"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />

          <Textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />

          <Button type="submit" className="w-full">
            Añadir Tarea
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
