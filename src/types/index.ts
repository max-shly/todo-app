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

export interface TodosState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
}

export type TodosAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Todo[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'SET_TODOS'; payload: Todo[] };
