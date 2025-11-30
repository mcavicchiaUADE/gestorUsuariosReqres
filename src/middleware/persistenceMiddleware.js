import { saveCreatedUsersToStorage } from '../utils/storage';

export const persistenceMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  
  if (action.type === 'users/createUser/fulfilled') {
    const state = store.getState();
    saveCreatedUsersToStorage(state.users.created_users);
  }
  
  return result;
};

