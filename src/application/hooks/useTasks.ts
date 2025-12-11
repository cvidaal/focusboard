import type { Priority, Task } from "@/domain/entities/Task";
import type { TaskRepository } from "@/domain/interfaces/TaskRepository";
import { LocalStorageTaskRepository } from "@/infrastructure/repositories/LocalStorageTaskRepository";
import { useState, useEffect, useMemo } from "react";

export type FilterType = "todas" | "completadas" | "pendientes";

export function useTask(repository?: TaskRepository) {

  const taskRepository = repository || new LocalStorageTaskRepository();

  // Estados de las tareas
  const [task, setTask] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [filter, setFilter] = useState<FilterType>("todas");
  const [searchQuery, setSearchQuery] = useState("");

  // Cargar tareas al iniciar
  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      const tasks = await taskRepository.getTasks();
      setTask(tasks);
      setIsLoading(false)
    };
    loadTasks();
  }, [taskRepository])

  useEffect(() => {
    if(!isLoading){
      taskRepository.saveTasks(task);
    }
  }, [task, isLoading, taskRepository])

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
    priority: Priority
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
    isLoading,
    setSearchQuery,
    setFilter,
    handleAgregarTarea,
    handleEliminarTarea,
    handleEditarTarea,
    handleToggleCompleted,
  };
}
