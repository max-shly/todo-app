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
  | { type: 'FETCH_SUCCESS'; payload: { todos: Todo[] } }
  | { type: 'FETCH_ERROR'; payload: { error: string } }
  | { type: 'SET_TODOS'; payload: { todos: Todo[] } }
  | { type: 'ADD_TODO'; payload: { todo: Todo } }
  | { type: 'UPDATE_TODO'; payload: { todo: Todo } }
  | { type: 'DELETE_TODO'; payload: { id: string } };
