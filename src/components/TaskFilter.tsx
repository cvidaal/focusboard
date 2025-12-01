import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export type FilterType = "todas" | "completadas" | "pendientes";

type taskFilterProps = {
  filtroActual: FilterType;
  onCambiarFiltro: (filtro: FilterType) => void;
  contadores: {
    todas: number;
    completadas: number;
    pendientes: number;
  };
};

export const TaskFilter = ({
  filtroActual,
  onCambiarFiltro,
  contadores,
}: taskFilterProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-2">
        <div className="flex gap-2 justify-center flex-wrap">
          <Button
            variant={filtroActual === "todas" ? "default" : "outline"}
            onClick={() => onCambiarFiltro("todas")}
            className="min-w-[120px]"
          >
            Todas
            <span className="ml-2 text-xs opacity-70">
              ({contadores.todas})
            </span>
          </Button>

          <Button
            variant={filtroActual === "pendientes" ? "default" : "outline"}
            onClick={() => onCambiarFiltro("pendientes")}
            className="min-w-[120px]"
          >
            Pendientes
            <span className="ml-2 text-xs opacity-70">
              ({contadores.pendientes})
            </span>
          </Button>

          <Button
            variant={filtroActual === "completadas" ? "default" : "outline"}
            onClick={() => onCambiarFiltro("completadas")}
            className="min-w-[120px]"
          >
            Completadas
            <span className="ml-2 text-xs opacity-70">
              ({contadores.completadas})
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
