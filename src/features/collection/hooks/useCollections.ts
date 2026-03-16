import { useEffect, useCallback } from 'react';

import { useAppSelector, useAppDispatch } from '@/app/hooks/hooks';

import {
  fetchCollectionsThunk,
  addCollectionThunk,
  updateCollectionThunk,
  deleteCollectionThunk,
} from '../store/collectionsSlice';

import type { Collection } from '../types';

export function useCollections() {
  const dispatch = useAppDispatch();
  const collections = useAppSelector((state) => state.collections.collections);
  const isLoading = useAppSelector((state) => state.collections.isLoading);
  const error = useAppSelector((state) => state.collections.error);

  useEffect(() => {
    dispatch(fetchCollectionsThunk());
  }, [dispatch]);

  const addCollection = useCallback(
    async (collection: Omit<Collection, 'id' | 'createdAt' | 'updatedAt'>) => {
      await dispatch(addCollectionThunk(collection)).unwrap();
    },
    [dispatch]
  );

  const updateCollection = useCallback(
    async (collection: Collection) => {
      await dispatch(updateCollectionThunk(collection)).unwrap();
    },
    [dispatch]
  );

  const deleteCollection = useCallback(
    async (id: string) => {
      await dispatch(deleteCollectionThunk(id)).unwrap();
    },
    [dispatch]
  );

  return {
    collections,
    isLoading,
    error,
    addCollection,
    updateCollection,
    deleteCollection,
  };
}
