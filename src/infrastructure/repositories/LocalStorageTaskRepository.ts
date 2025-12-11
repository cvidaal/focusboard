import type { Task } from "@/domain/entities/Task";
import type { TaskRepository } from "@/domain/interfaces/TaskRepository";

export class LocalStorageTaskRepository implements TaskRepository {
    async saveTasks(tasks: Task[]): Promise<void> {
        localStorage.setItem("tasks", JSON.stringify(tasks));
        // Promesa resuelta inmediatamente para mantener la firma async
        return Promise.resolve();
    }
    async getTasks(): Promise<Task[]> {
        const tasks =await localStorage.getItem("tasks");

        if (!tasks){
            return [];
        }

        // Parsear y convertir las fechas
        const parsed = JSON.parse(tasks);
        return parsed.map((task: Task) => {
            return {
                ...task,
                createdAt: new Date(task.createdAt),
            }
        });
    }
}
