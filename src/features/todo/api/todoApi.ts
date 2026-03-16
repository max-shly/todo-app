import { type Todo } from '../types/index.ts';

const STORAGE_KEY = 'todoList';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

class TodoApi {
  protected generateRandomError() {
    if (Math.random() < 0.2) {
      throw new Error();
    }
  }

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
      this.generateRandomError();

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
      this.generateRandomError();

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

  async updateTodo(id: string, todoUpdates: Partial<Todo>): Promise<ApiResponse<Todo>> {
    return this.executeWithStorage((todos) => {
      const index = todos.findIndex((todo) => todo.id === id);
      if (index === -1) throw new Error('Todo not found');

      const updated = {
        ...todos[index],
        ...todoUpdates,
        updatedAt: new Date().toISOString(),
      };

      const newTodos = [...todos];
      newTodos[index] = updated;

      return { newTodos, result: updated };
    });
  }

  async deleteTodo(id: string): Promise<ApiResponse<string>> {
    return this.executeWithStorage((todos) => {
      const index = todos.findIndex((todo) => todo.id === id);
      if (index === -1) throw new Error('Todo not found');

      const newTodos = todos.filter((todo) => todo.id !== id);

      return { newTodos, result: id };
    });
  }

  async deleteAllTodos(): Promise<ApiResponse<Todo[]>> {
    return this.executeWithStorage(() => {
      return { newTodos: [], result: [] };
    });
  }

  async deleteCompletedTodos(): Promise<ApiResponse<string[]>> {
    return this.executeWithStorage((todos) => {
      const completedIds = todos
        .filter((todo) => todo.status === 'complete')
        .map((todo) => todo.id);

      const newTodos = todos.filter((t) => t.status !== 'complete');

      return { newTodos, result: completedIds };
    });
  }
}

export const todoApi = new TodoApi();
