import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import { persistenceMiddleware } from '../middleware/persistenceMiddleware';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(persistenceMiddleware),
});

export default store;

