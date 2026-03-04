import { useCallback, useState } from 'react';

import type { Todo } from '../types';

export function useTodoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const open = useCallback((todo: Todo | null) => {
    setIsOpen(true);
    setEditingTodo(todo);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setEditingTodo(null);
  }, []);

  return { isOpen, editingTodo, open, close };
}
