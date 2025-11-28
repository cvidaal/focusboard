export const formatearFechaInteligente = (fecha: Date) => {
  const ahora = new Date();
  const fechaTarea = new Date(fecha);

  // Resetear horas para comparar solo días
  const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
  const diaFecha = new Date(
    fechaTarea.getFullYear(),
    fechaTarea.getMonth(),
    fechaTarea.getDate()
  );

  const diffTiempo = diaFecha.getTime() - hoy.getTime();
  const diffDias = Math.floor(diffTiempo / (1000 * 60 * 60 * 24));

  const hora = fechaTarea.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (diffDias === 0) {
    return `Hoy a las ${hora}`;
  } else if (diffDias === -1) {
    return `Ayer a las ${hora}`;
  } else if (diffDias === 1) {
    return `Mañana a las ${hora}`;
  } else if (diffDias > 1 && diffDias <= 7) {
    return `En ${diffDias} días a las ${hora}`;
  } else if (diffDias < -1 && diffDias >= -7) {
    return `Hace ${Math.abs(diffDias)} días a las ${hora}`;
  } else {
    return fechaTarea.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
};

