import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { formatearFechaInteligente } from "@/helpers/formattedDate";

type TaskItemProps = {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  priority: "high" | "medium" | "low";
  onEliminar: (id: number) => void;
  onEditar: (id: number, nuevoTitulo: string, nuevaDescripcion: string) => void;
  onToggleCompleted: (id: number) => void;
};

// Esto ya es un componente
const TaskItemComponent = ({
  id,
  title,
  description,
  completed,
  createdAt,
  priority,
  onEliminar,
  onEditar,
  onToggleCompleted,
}: TaskItemProps) => {
  const [editando, setEditando] = useState(false);
  const [nuevoTitulo, setNuevoTitulo] = useState(title);
  const [nuevaDescripcion, setNuevaDescripcion] = useState(description);

  // Mapeo de colores para prioridades
  const priorityColors = {
    high: "bg-red-500/10 text-red-500",
    medium: "bg-yellow-500/10 text-yellow-500",
    low: "bg-green-500/10 text-green-500",
  };

  const guardarCambios = () => {
    onEditar(id, nuevoTitulo, nuevaDescripcion || "");
    setEditando(false); // Salir del modo edición
  };

  const cancelarEdicion = () => {
    setNuevoTitulo(title);
    setNuevaDescripcion(description);
    setEditando(false); // Salir del modo edición
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <AnimatePresence mode="wait">
        {editando ? (
          <motion.div
            key="editing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <Input
                    value={nuevoTitulo}
                    onChange={(e) => setNuevoTitulo(e.target.value)}
                  />
                  <Textarea
                    value={nuevaDescripcion}
                    onChange={(e) => setNuevaDescripcion(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={guardarCambios}>
                      <Check className="h-4 w-4 mr-2" />
                      Guardar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={cancelarEdicion}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="viewing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card
              className={`transition-all hover:shadow-lg flex${
                completed ? "opacity-60" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-start gap-3">
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.1 }}
                    className="mt-1"
                  >
                    <Checkbox
                      checked={completed}
                      onCheckedChange={() => onToggleCompleted(id)}
                    ></Checkbox>
                  </motion.div>
                  <div className="flex-1">
                    <CardTitle
                      className={`text-2xl font-bold tracking-tight hover:text-primary transition-colors cursor-pointer ${
                        completed
                          ? "line-through text-muted-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p
                  className={` ${
                    completed
                      ? "line-through text-muted-foreground/60"
                      : "text-muted-foreground"
                  }`}
                >
                  {description}
                </p>
                <p className="text-xs text-muted-foreground/60 mb-4">
                  {formatearFechaInteligente(createdAt)}
                  <span
                    className={`ml-2 px-2 py-1 rounded-full text-xs ${priorityColors[priority]}`}
                  >
                    {priority}
                  </span>
                </p>

                <div className="flex gap-2 mt-4">
                  {!completed && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditando(true)}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </motion.div>
                  )}

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onEliminar(id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Usamos React.memo para memorizar el componente y evitar renders innecesarios
export const TaskItem = React.memo(TaskItemComponent);
