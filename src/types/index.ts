export type TodoStatus = 'complete' | 'incomplete';

export interface Todo {
  id: string;
  title: string;
  date: string;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}
