import { type Middleware, configureStore, isRejected } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

import collectionsReducer from '@/features/collection/store/collectionsSlice';
import todosReducer from '@/features/todo/store/todosSlice';

const errorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejected(action)) {
    const rawError = action.payload ?? action.error?.message;

    let errorMessage = 'Unknown error';
    if (typeof rawError === 'string') {
      errorMessage = rawError;
    } else if (rawError && typeof rawError === 'object' && 'message' in rawError) {
      errorMessage = String(rawError.message);
    } else if (rawError) {
      errorMessage = String(rawError);
    }

    toast.error(errorMessage);
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    collections: collectionsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(errorMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
