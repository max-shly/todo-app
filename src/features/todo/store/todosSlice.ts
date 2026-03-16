import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { todoApi } from '../api/todoApi';

import type { Todo } from '../types';

export interface TodosState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  isLoading: false,
  error: null,
};

export const fetchTodosThunk = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    const { data, error } = await todoApi.fetchTodos();
    if (error) return rejectWithValue(error);
    return data ?? [];
  }
);

export const addTodoThunk = createAsyncThunk(
  'todos/addTodo',
  async (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    const { data, error } = await todoApi.createTodo(todo);
    if (error || !data) return rejectWithValue(error ?? 'No data');
    return data;
  }
);

export const updateTodoThunk = createAsyncThunk(
  'todos/updateTodo',
  async (todo: Todo, { rejectWithValue }) => {
    const { data, error } = await todoApi.updateTodo(todo.id, todo);
    if (error || !data) return rejectWithValue(error ?? 'No data');
    return data;
  }
);

export const deleteTodoThunk = createAsyncThunk(
  'todos/deleteTodo',
  async (id: string, { rejectWithValue }) => {
    const { data, error } = await todoApi.deleteTodo(id);
    if (error || !data) return rejectWithValue(error ?? 'No data');
    return id;
  }
);

export const deleteAllTodosThunk = createAsyncThunk(
  'todos/deleteAllTodos',
  async (_, { rejectWithValue }) => {
    const { data, error } = await todoApi.deleteAllTodos();
    if (error || !data) return rejectWithValue(error ?? 'No data');
    return data;
  }
);

export const deleteCompletedTodosThunk = createAsyncThunk(
  'todos/deleteCompletedTodos',
  async (_, { rejectWithValue }) => {
    const { data, error } = await todoApi.deleteCompletedTodos();
    if (error || !data) return rejectWithValue(error ?? 'No data');
    return data;
  }
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTodosThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos = action.payload;
      })
      .addCase(addTodoThunk.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodoThunk.fulfilled, (state, action) => {
        const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) state.todos[index] = action.payload;
      })
      .addCase(deleteTodoThunk.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteAllTodosThunk.fulfilled, (state) => {
        state.todos = [];
      })
      .addCase(deleteCompletedTodosThunk.fulfilled, (state, action) => {
        state.todos = state.todos.filter((todo) => !action.payload.includes(todo.id));
      })
      .addMatcher(
        (action): action is { type: string; payload: string } =>
          action.type.endsWith('/rejected') && 'payload' in action,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        }
      );
  },
});

export const { clearError } = todosSlice.actions;

export default todosSlice.reducer;
