import { useReducer, useEffect, useCallback } from 'react';

import toast from 'react-hot-toast';

import { todoApi } from '../api/todoApi';
import { todosReducer, initialState } from '../store/todosReducer';

import type { Todo } from '../types';

export function useTodos() {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  useEffect(() => {
    const loadTodos = async () => {
      dispatch({ type: 'FETCH_START' });

      const { data, error } = await todoApi.fetchTodos();

      if (error) {
        dispatch({ type: 'FETCH_ERROR', payload: { error } });
        toast.error(error);
      }

      dispatch({ type: 'FETCH_SUCCESS', payload: { todos: data } });
      toast.success('Todos loaded!');
    };

    loadTodos();
  }, []);

  const addTodo = useCallback(async (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    const { data, error } = await todoApi.createTodo(todo);

    if (error) {
      dispatch({ type: 'FETCH_ERROR', payload: { error } });
      toast.error(error);
    }

    dispatch({ type: 'SET_TODOS', payload: { todos: data } });
    toast.success('Todo added!');
  }, []);

  return { state, addTodo };
}
