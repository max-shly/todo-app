import { useReducer, useEffect, useCallback } from 'react';

import toast from 'react-hot-toast';

import { todoApi } from '../api/todoApi';
import { todosReducer, initialState } from '../store/todosReducer';

import type { Todo, TodoStatus } from '../types';

export function useTodos() {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  useEffect(() => {
    const loadTodos = async () => {
      dispatch({ type: 'FETCH_START' });

      const { data, error } = await todoApi.fetchTodos();

      if (error) {
        dispatch({ type: 'FETCH_ERROR', payload: { error } });
        toast.error(error);
        return;
      }

      if (!data) {
        dispatch({ type: 'FETCH_ERROR', payload: { error: 'No data' } });
        toast.error('No data returned');
        return;
      }

      dispatch({ type: 'FETCH_SUCCESS', payload: { todos: data } });
      toast.success('Todos loaded!');
    };

    loadTodos();
  }, []);

  const addTodo = useCallback(async (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    const { data, error } = await todoApi.createTodo(todo);

    if (error) {
      toast.error(error);
      return;
    }

    if (!data) {
      toast.error('No data returned');
      return;
    }

    dispatch({ type: 'ADD_TODO', payload: { todo: data } });
    toast.success('Todo added!');
  }, []);

  const updateTodo = useCallback(async (todo: Todo) => {
    const { data, error } = await todoApi.updateTodo(todo.id, todo);

    if (error) {
      toast.error(error);
      return;
    }

    if (!data) {
      toast.error('No data returned');
      return;
    }

    dispatch({ type: 'UPDATE_TODO', payload: { todo: data } });
    toast.success('Todo updated!');
  }, []);

  const toggleTodoStatus = useCallback(
    (todo: Todo) => {
      const toggled = {
        ...todo,
        status: (todo.status === 'complete' ? 'incomplete' : 'complete') as TodoStatus,
      };

      updateTodo(toggled);
    },
    [updateTodo]
  );

  const deleteTodo = useCallback(async (id: string) => {
    const { data, error } = await todoApi.deleteTodo(id);

    if (error) {
      toast.error(error);
      return;
    }

    if (!data) {
      toast.error('No data returned');
      return;
    }

    dispatch({ type: 'DELETE_TODO', payload: { id } });
    toast.success('Todo deleted!');
  }, []);

  const deleteAllTodos = useCallback(async () => {
    const { data, error } = await todoApi.deleteAllTodos();

    if (error) {
      toast.error(error);
      return;
    }

    if (!data) {
      toast.error('No data returned');
      return;
    }

    dispatch({ type: 'SET_TODOS', payload: { todos: [] } });
    toast.success('All todos deleted!');
  }, []);

  const deleteCompletedTodos = useCallback(async () => {
    const { data, error } = await todoApi.deleteCompletedTodos();

    if (error) {
      toast.error(error);
      return;
    }

    if (!data) {
      toast.error('No data returned');
      return;
    }

    dispatch({ type: 'SET_TODOS', payload: { todos: data } });
    toast.success('Completed todos deleted');
  }, []);

  return {
    state,
    addTodo,
    updateTodo,
    toggleTodoStatus,
    deleteTodo,
    deleteAllTodos,
    deleteCompletedTodos,
  };
}
