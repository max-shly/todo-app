import type { Todo } from '@/features/todo/types';

export interface AppData {
  todos: Todo[];
}

const STORAGE_KEY = 'appData';

export function getAppData(): AppData {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { todos: [] };
  } catch {
    return { todos: [] };
  }
}

export function saveAppData(data: AppData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
