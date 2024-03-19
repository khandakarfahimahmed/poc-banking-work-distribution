export interface Task {
  task_id: number;
  task_name: string;
  assigned_to: string;
  assigned_by: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface TasksResponse {
  tasks: Task[];
}
