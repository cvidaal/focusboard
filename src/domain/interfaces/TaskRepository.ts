// Este archivo define el contrato algo que puede guardar y leer tareas, no importa si es localstorage o api...
import type { Task } from "../entities/Task";

export interface TaskRepository {
    saveTasks(tasks: Task[]): Promise<void>; // Guarda todas las tareas
    getTasks(): Promise<Task[]>; // Devuelve todas las tareas
}