import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { collectionsApi } from '../api/collectionsApi';

import type { Collection } from '../types';

export interface CollectionsState {
  collections: Collection[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CollectionsState = {
  collections: [],
  isLoading: false,
  error: null,
};

export const fetchCollectionsThunk = createAsyncThunk(
  'collections/fetchCollections',
  async (_, { rejectWithValue }) => {
    const { data, error } = await collectionsApi.fetchCollections();
    if (error) return rejectWithValue(error);
    return data ?? [];
  }
);

export const addCollectionThunk = createAsyncThunk(
  'collections/addCollection',
  async (collection: Omit<Collection, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    const { data, error } = await collectionsApi.createCollection(collection);
    if (error || !data) return rejectWithValue(error ?? 'No data');
    return data;
  }
);

export const updateCollectionThunk = createAsyncThunk(
  'collections/updateCollection',
  async (collection: Collection, { rejectWithValue }) => {
    const { data, error } = await collectionsApi.updateCollection(collection.id, collection);
    if (error || !data) return rejectWithValue(error ?? 'No data');
    return data;
  }
);

export const deleteCollectionThunk = createAsyncThunk(
  'collections/deleteCollection',
  async (id: string, { rejectWithValue }) => {
    const { data, error } = await collectionsApi.deleteCollection(id);
    if (error || !data) return rejectWithValue(error ?? 'No data');
    return id;
  }
);

export const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollectionsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCollectionsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.collections = action.payload;
      })
      .addCase(addCollectionThunk.fulfilled, (state, action) => {
        state.collections.push(action.payload);
      })
      .addCase(updateCollectionThunk.fulfilled, (state, action) => {
        const index = state.collections.findIndex(
          (collection) => collection.id === action.payload.id
        );
        if (index !== -1) state.collections[index] = action.payload;
      })
      .addCase(deleteCollectionThunk.fulfilled, (state, action) => {
        state.collections = state.collections.filter(
          (collection) => collection.id !== action.payload
        );
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

export const { clearError } = collectionsSlice.actions;

export default collectionsSlice.reducer;
