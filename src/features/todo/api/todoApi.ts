import { BaseApi } from '@/shared/lib/baseApi.ts';
import { getAppData } from '@/shared/lib/storage.ts';
import type { ApiResponse } from '@/shared/types/index.ts';

import { type Todo } from '../types/index.ts';

class TodoApi extends BaseApi {
  protected generateRandomError() {
    if (Math.random() < 0.2) {
      throw new Error();
    }
  }

  async fetchTodos(): Promise<ApiResponse<Todo[]>> {
    try {
      this.generateRandomError();

      const appData = getAppData();
      return { data: appData.todos, error: null };
    } catch (error) {
      return { data: null, error: `Failed to fetch todos: ${error}` };
    }
  }

  async createTodo(
    todoData: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ApiResponse<Todo>> {
    return this.executeWithAppData((appData) => {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        ...todoData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return { newAppData: { ...appData, todos: [...appData.todos, newTodo] }, result: newTodo };
    });
  }

  async updateTodo(id: string, todoUpdates: Partial<Todo>): Promise<ApiResponse<Todo>> {
    return this.executeWithAppData((appData) => {
      const index = appData.todos.findIndex((todo) => todo.id === id);
      if (index === -1) throw new Error('Todo not found');

      const updated = {
        ...appData.todos[index],
        ...todoUpdates,
        updatedAt: new Date().toISOString(),
      };

      const newTodos = [...appData.todos];
      newTodos[index] = updated;

      return { newAppData: { ...appData, todos: newTodos }, result: updated };
    });
  }

  async deleteTodo(id: string): Promise<ApiResponse<string>> {
    return this.executeWithAppData((appData) => {
      const index = appData.todos.findIndex((todo) => todo.id === id);
      if (index === -1) throw new Error('Todo not found');

      const newTodos = appData.todos.filter((todo) => todo.id !== id);

      return { newAppData: { ...appData, todos: newTodos }, result: id };
    });
  }

  async deleteAllTodos(): Promise<ApiResponse<Todo[]>> {
    return this.executeWithAppData((appData) => {
      return { newAppData: { ...appData, todos: [] }, result: [] };
    });
  }

  async deleteCompletedTodos(): Promise<ApiResponse<string[]>> {
    return this.executeWithAppData((appData) => {
      const completedIds = appData.todos
        .filter((todo) => todo.status === 'complete')
        .map((todo) => todo.id);

      const newTodos = appData.todos.filter((todo) => todo.status !== 'complete');

      return { newAppData: { ...appData, todos: newTodos }, result: completedIds };
    });
  }
}

export const todoApi = new TodoApi();
