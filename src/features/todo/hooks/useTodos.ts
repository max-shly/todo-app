import { useEffect, useCallback } from 'react';

import { useAppSelector, useAppDispatch } from '@/app/hooks/hooks';

import {
  fetchTodosThunk,
  addTodoThunk,
  updateTodoThunk,
  deleteTodoThunk,
  deleteAllTodosThunk,
  deleteCompletedTodosThunk,
} from '../store/todosSlice';

import type { Todo, TodoStatus } from '../types';

export function useTodos() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos);
  const isLoading = useAppSelector((state) => state.todos.isLoading);
  const error = useAppSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(fetchTodosThunk());
  }, [dispatch]);

  const addTodo = useCallback(
    async (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
      await dispatch(addTodoThunk(todo)).unwrap();
    },
    [dispatch]
  );

  const updateTodo = useCallback(
    async (todo: Todo) => {
      await dispatch(updateTodoThunk(todo)).unwrap();
    },
    [dispatch]
  );

  const toggleTodoStatus = useCallback(
    async (todo: Todo) => {
      const toggled = {
        ...todo,
        status: (todo.status === 'complete' ? 'incomplete' : 'complete') as TodoStatus,
      };

      await updateTodo(toggled);
    },
    [updateTodo]
  );

  const deleteTodo = useCallback(
    async (id: string) => {
      await dispatch(deleteTodoThunk(id)).unwrap();
    },
    [dispatch]
  );

  const deleteAllTodos = useCallback(async () => {
    await dispatch(deleteAllTodosThunk()).unwrap();
  }, [dispatch]);

  const deleteCompletedTodos = useCallback(async () => {
    await dispatch(deleteCompletedTodosThunk()).unwrap();
  }, [dispatch]);

  return {
    todos,
    isLoading,
    error,
    addTodo,
    updateTodo,
    toggleTodoStatus,
    deleteTodo,
    deleteAllTodos,
    deleteCompletedTodos,
  };
}
