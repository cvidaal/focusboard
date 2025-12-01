import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TaskFormProps = {
  onAgregarTarea: (
    title: string,
    description: string,
    priority: "high" | "medium" | "low"
  ) => void;
};

export const TaskForm = ({ onAgregarTarea }: TaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAgregarTarea(title, description, priority as "high" | "medium" | "low");
    setTitle("");
    setDescription("");
    setPriority("low"); // Por defecto baja
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Title of the task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex gap-2">
            <p>Priority:</p>
            <Button
              type="button"
              variant={priority === "high" ? "default" : "outline"}
              onClick={() => setPriority("high")}
              className={
                priority === "high" ? "bg-red-500 hover:bg-red-600" : ""
              }
            >
              High
            </Button>
            <Button
              type="button"
              variant={priority === "medium" ? "default" : "outline"}
              onClick={() => setPriority("medium")}
              className={
                priority === "medium" ? "bg-yellow-500 hover:bg-yellow-600" : ""
              }
            >
              Medium
            </Button>
            <Button
              type="button"
              variant={priority === "low" ? "default" : "outline"}
              onClick={() => setPriority("low")}
              className={
                priority === "low" ? "bg-green-500 hover:bg-green-600" : ""
              }
            >
              Low
            </Button>
          </div>

          <Button type="submit" className="w-full">
            Añadir Tarea
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
