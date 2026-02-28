import { type Todo, type ApiResponse } from '../types/index.ts';

const STORAGE_KEY = 'todoList';

class TodoApi {
  protected readFromStorage(): Todo[] {
    try {
      const localTodoList = localStorage.getItem(STORAGE_KEY);
      return localTodoList ? JSON.parse(localTodoList) : [];
    } catch {
      console.error("Couldn't parse todos from localStorage");
      return [];
    }
  }

  protected writeToStorage(todos: Todo[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }

  async fetchTodos(): Promise<ApiResponse<Todo[]>> {
    try {
      const todos = this.readFromStorage();
      return { data: todos, error: null };
    } catch (error) {
      return { data: null, error: `Failed to fetch todos: ${error}` };
    }
  }
}

export const todoApi = new TodoApi();
