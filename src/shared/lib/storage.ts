import type { Collection } from '@/features/collection/types';
import type { Todo } from '@/features/todo/types';

export interface AppData {
  todos: Todo[];
  collections: Collection[];
}

const STORAGE_KEY = 'appData';

export function getAppData(): AppData {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { todos: [], collections: [] };
  } catch {
    return { todos: [], collections: [] };
  }
}

export function saveAppData(data: AppData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
