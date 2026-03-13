export type TodoStatus = 'complete' | 'incomplete';

export interface Todo {
  id: string;
  title: string;
  date: string;
  status: TodoStatus;
  createdAt: string;
  updatedAt: string;
}
