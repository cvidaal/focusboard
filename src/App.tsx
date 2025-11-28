import { TaskFilter } from "./components/TaskFilter";
import { TaskForm } from "./components/TaskForm";
import { TaskItem } from "./components/TaskItem";
import { Card, CardContent } from "./components/ui/card";
import { useTareas } from "./hooks/useTareas";

export const App = () => {
  const {
    tareas,
    handleAgregarTarea,
    handleEliminarTarea,
    handleEditarTarea,
    handleToggleCompleted,
    filtro,
    contadores,
    setFiltro,
  } = useTareas();
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              Beta 0.1
            </span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-transparent">
            FocusBoard
          </h1>
        </div>
        <p className="text-muted-foreground text-sm px-4 text-center mb-6">
          Organiza tu día, alcanza tus metas
        </p>
        {/* Agregar Tarea formulario */}
        <TaskForm onAgregarTarea={handleAgregarTarea} />
        {/* Filtro de tareas */}
        <TaskFilter
          filtroActual={filtro}
          onCambiarFiltro={setFiltro}
          contadores={contadores}
        />
        {/* Recorremos el aray y mostramos cada tarea. */}
        <div className="space-y-4 mt-8">
          {tareas.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground text-lg">
                  No hay tareas. ¡Añade una nueva tarea para empezar!
                </p>
              </CardContent>
            </Card>
          ) : (
            tareas.map((tarea) => (
              <TaskItem
                id={tarea.id}
                title={tarea.title}
                description={tarea.description}
                createdAt={tarea.createdAt}
                completed={tarea.completed}
                onEliminar={handleEliminarTarea}
                onEditar={handleEditarTarea}
                onToggleCompleted={handleToggleCompleted}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
