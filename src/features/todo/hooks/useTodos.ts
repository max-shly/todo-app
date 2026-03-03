import { useReducer, useEffect } from 'react';

import toast from 'react-hot-toast';

import { todoApi } from '../api/todoApi';
import { todosReducer, initialState } from '../store/todosReducer';

export function useTodos() {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  useEffect(() => {
    const loadTodos = async () => {
      dispatch({ type: 'FETCH_START' });

      const { data, error } = await todoApi.fetchTodos();

      if (error) {
        dispatch({ type: 'FETCH_ERROR', payload: { error } });
        toast.error(error);
      } else {
        dispatch({ type: 'FETCH_SUCCESS', payload: { todos: data } });
      }
    };

    loadTodos();
  }, []);

  return { state };
}
