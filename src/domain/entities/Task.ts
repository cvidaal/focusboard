export type Priority = "high" | "medium" | "low";

export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  priority: Priority;
};