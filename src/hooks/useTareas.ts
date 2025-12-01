import { useState, useEffect, useMemo } from "react";

type priority = "high" | "medium" | "low";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  priority: priority;
};

export type FilterType = "todas" | "completadas" | "pendientes";

export function useTask() {
  // UseState con array de tareas
  const [task, setTask] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tareas");
    if (savedTasks) {
      const tareasParsed = JSON.parse(savedTasks);
      // Convetir las fechas de string a Date
      return tareasParsed.map((tarea: Task) => ({
        ...tarea,
        createdAt: new Date(tarea.createdAt),
      }));
    }
    return [];
  });

  const [filter, setFilter] = useState<FilterType>("todas");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(task));
  }, [task]); // Solo se ejecuta cuando tareas cambia

  // Para filtrar las tareas según el filtro seleccionado
  const filterTask = useMemo(() => {
    let result = task;

    switch (filter) {
      case "completadas":
        result = task.filter((tarea) => tarea.completed);
        break;
      case "pendientes":
        result = task.filter((tarea) => !tarea.completed);
        break;
    }

    if (searchQuery.trim() !== "") {
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return result;
  }, [task, filter, searchQuery]);

  // Contadores para el TaskFilter
  const counter = useMemo(
    () => ({
      todas: task.length,
      pendientes: task.filter((tarea) => !tarea.completed).length,
      completadas: task.filter((tarea) => tarea.completed).length,
    }),
    [task]
  );

  const handleAgregarTarea = (
    titulo: string,
    descripcion: string,
    priority: priority
  ) => {
    const nuevaTarea: Task = {
      id: Date.now(),
      title: titulo,
      description: descripcion,
      completed: false,
      createdAt: new Date(),
      priority: priority,
    };

    setTask([...task, nuevaTarea]);
  };

  const handleEliminarTarea = (id: number) => {
    setTask(task.filter((tarea) => tarea.id !== id));
  };

  const handleEditarTarea = (
    id: number,
    nuevoTitutlo: string,
    nuevaDescripcion: string
  ) => {
    setTask(
      task.map((tarea) =>
        tarea.id === id
          ? { ...tarea, title: nuevoTitutlo, description: nuevaDescripcion }
          : tarea
      )
    );
  };

  const handleToggleCompleted = (id: number) => {
    setTask(
      task.map((tarea) =>
        tarea.id === id ? { ...tarea, completed: !tarea.completed } : tarea
      )
    );
  };

  return {
    task: filterTask,
    filter,
    counter,
    searchQuery,
    setSearchQuery,
    setFilter,
    handleAgregarTarea,
    handleEliminarTarea,
    handleEditarTarea,
    handleToggleCompleted,
  };
}
