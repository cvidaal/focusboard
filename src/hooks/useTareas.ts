import { useState, useEffect, useMemo } from "react";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
};

export type FilterType = "todas" | "completadas" | "pendientes";

export function useTareas() {
  // UseState con array de tareas
  const [tareas, setTareas] = useState<Task[]>(() => {
    const tareasGuardadas = localStorage.getItem("tareas");
    if (tareasGuardadas) {
      const tareasParsed = JSON.parse(tareasGuardadas);
      // Convetir las fechas de string a Date
      return tareasParsed.map((tarea: Task) => ({
        ...tarea,
        createdAt: new Date(tarea.createdAt),
      }));
    }
    return [];
  });

  const [filtro, setFiltro] = useState<FilterType>("todas");

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]); // Solo se ejecuta cuando tareas cambia

  // Para filtrar las tareas según el filtro seleccionado
  const tareasFiltradas = useMemo(() => {
    switch (filtro) {
      case "completadas":
        return tareas.filter((tarea) => tarea.completed);
      case "pendientes":
        return tareas.filter((tarea) => !tarea.completed);
      case "todas":
        return tareas;
    }
  }, [tareas, filtro]);

  // Contadores para el TaskFilter
  const contadores = useMemo(
    () => ({
      todas: tareas.length,
      pendientes: tareas.filter((tarea) => !tarea.completed).length,
      completadas: tareas.filter((tarea) => tarea.completed).length,
    }),
    [tareas]
  );

  const handleAgregarTarea = (titulo: string, descripcion: string) => {
    const nuevaTarea: Task = {
      id: Date.now(),
      title: titulo,
      description: descripcion,
      completed: false,
      createdAt: new Date(),
    };

    setTareas([...tareas, nuevaTarea]);
  };

  const handleEliminarTarea = (id: number) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  const handleEditarTarea = (
    id: number,
    nuevoTitutlo: string,
    nuevaDescripcion: string
  ) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id
          ? { ...tarea, title: nuevoTitutlo, description: nuevaDescripcion }
          : tarea
      )
    );
  };

  const handleToggleCompleted = (id: number) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completed: !tarea.completed } : tarea
      )
    );
  };

  return {
    tareas: tareasFiltradas,
    filtro,
    contadores,
    setFiltro,
    handleAgregarTarea,
    handleEliminarTarea,
    handleEditarTarea,
    handleToggleCompleted,
  };
}
