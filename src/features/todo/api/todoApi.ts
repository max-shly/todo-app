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

  protected async executeWithStorage<R>(
    operation: (todos: Todo[]) => { newTodos: Todo[]; result: R }
  ): Promise<ApiResponse<R>> {
    try {
      const todos = this.readFromStorage();

      const { newTodos, result } = operation(todos);

      this.writeToStorage(newTodos);

      return { data: result, error: null };
    } catch (error) {
      return { data: null, error: `Operation failed: ${error}` };
    }
  }

  async fetchTodos(): Promise<ApiResponse<Todo[]>> {
    try {
      const todos = this.readFromStorage();
      return { data: todos, error: null };
    } catch (error) {
      return { data: null, error: `Failed to fetch todos: ${error}` };
    }
  }

  async createTodo(
    todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<Todo>> {
    return this.executeWithStorage((todos) => {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        ...todoData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return { newTodos: [...todos, newTodo], result: newTodo };
    });
  }
}

export const todoApi = new TodoApi();
