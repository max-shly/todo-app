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

  protected async executeWithStorage(
    operation: (todos: Todo[]) => Todo[]
  ): Promise<ApiResponse<Todo[]>> {
    try {
      const todos = this.readFromStorage();
      const newTodos = operation(todos);

      if (newTodos !== todos) {
        this.writeToStorage(newTodos);
      }

      return { data: newTodos, error: null };
    } catch (error) {
      return { data: [], error: `Operation failed: ${error}` };
    }
  }

  async fetchTodos(): Promise<ApiResponse<Todo[]>> {
    try {
      const todos = this.readFromStorage();
      return { data: todos, error: null };
    } catch (error) {
      return { data: [], error: `Failed to fetch todos: ${error}` };
    }
  }

  async createTodo(
    todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<Todo[]>> {
    const result = this.executeWithStorage((todos) => {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        ...todoData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return [...todos, newTodo];
    });

    return result;
  }

  async updateTodo(todoData: Omit<Todo, 'updatedAt'>): Promise<ApiResponse<Todo[]>> {
    const result = this.executeWithStorage((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === todoData.id) {
          return {
            ...todoData,
            updatedAt: new Date().toISOString(),
          };
        } else {
          return todo;
        }
      });

      return newTodos;
    });

    return result;
  }

  async deleteTodo(todoId: string): Promise<ApiResponse<Todo[]>> {
    const result = this.executeWithStorage((todos) => todos.filter((todo) => todo.id !== todoId));

    return result;
  }

  async deleteAllTodos(): Promise<ApiResponse<Todo[]>> {
    const result = this.executeWithStorage(() => []);

    return result;
  }

  async deleteCompletedTodos(): Promise<ApiResponse<Todo[]>> {
    const result = this.executeWithStorage((todos) =>
      todos.filter((todo) => todo.status === 'complete')
    );

    return result;
  }
}

export const todoApi = new TodoApi();
