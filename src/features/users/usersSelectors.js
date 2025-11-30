import { createSelector } from '@reduxjs/toolkit';

const selectUsersState = (state) => state.users;

const selectApiUsers = createSelector(
  [selectUsersState],
  (usersState) => usersState.items
);

const selectCreatedUsers = createSelector(
  [selectUsersState],
  (usersState) => usersState.created_users
);

export const selectCurrentPage = createSelector(
  [selectUsersState],
  (usersState) => usersState.current_page
);

export const selectUsers = createSelector(
  [selectCreatedUsers, selectApiUsers, selectCurrentPage],
  (created_users, api_users, current_page) => {
    if (current_page === 1) {
      return [...created_users, ...api_users];
    }
    return api_users;
  }
);

export const selectUsersStatus = createSelector(
  [selectUsersState],
  (usersState) => usersState.status
);

export const selectIsLoadingUsers = createSelector(
  [selectUsersStatus],
  (status) => status === 'loading'
);

export const selectUsersError = createSelector(
  [selectUsersState],
  (usersState) => usersState.error
);

export const selectIsCreatingUser = createSelector(
  [selectUsersState],
  (usersState) => usersState.is_creating_user
);

export const selectTotalPages = createSelector(
  [selectUsersState],
  (usersState) => usersState.total_pages
);

export const selectHasPreviousPage = createSelector(
  [selectCurrentPage],
  (current_page) => current_page > 1
);

export const selectHasNextPage = createSelector(
  [selectCurrentPage, selectTotalPages],
  (current_page, total_pages) => total_pages !== null && current_page < total_pages
);

export const selectIsLoadingFromStorage = createSelector(
  [selectUsersState],
  (usersState) => usersState.is_loading_from_storage
);

