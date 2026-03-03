import { type TodosState, type TodosAction } from '../types/index.ts';

export const initialState: TodosState = {
  todos: [],
  isLoading: false,
  error: null,
};

export function todosReducer(state: TodosState, action: TodosAction) {
  switch (action.type) {
    case 'FETCH_START': {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case 'FETCH_SUCCESS': {
      return {
        ...state,
        todos: action.payload,
        isLoading: false,
        error: null,
      };
    }
    case 'FETCH_ERROR': {
      return {
        ...state,
        todos: [],
        isLoading: false,
        error: action.payload,
      };
    }
    case 'SET_TODOS': {
      return {
        ...state,
        todos: action.payload,
        isLoading: false,
        error: null,
      };
    }
  }
}
