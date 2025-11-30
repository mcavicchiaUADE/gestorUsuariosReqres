import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { usersApi } from '../../services/api';
import { loadCreatedUsersFromStorage } from '../../utils/storage';

const initialState = {
  items: [],
  created_users: [],
  status: 'idle',
  error: null,
  current_page: 1,
  total_pages: null,
  per_page: null,
  total: null,
  is_creating_user: false,
  is_loading_from_storage: true,
};

export const loadCreatedUsersFromStorageThunk = createAsyncThunk(
  'users/loadFromStorage',
  async () => {
    const users = await loadCreatedUsersFromStorage();
    return users || [];
  }
);

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page = 1, { rejectWithValue }) => {
    try {
      const data = await usersApi.fetchUsers(page);
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Error al obtener usuarios');
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (user_data, { rejectWithValue }) => {
    try {
      const data = await usersApi.createUser(user_data);
      return { ...data, ...user_data };
    } catch (error) {
      return rejectWithValue(error.message || 'Error al crear usuario');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCreatedUsersFromStorageThunk.pending, (state) => {
        state.is_loading_from_storage = true;
      })
      .addCase(loadCreatedUsersFromStorageThunk.fulfilled, (state, action) => {
        state.is_loading_from_storage = false;
        state.created_users = action.payload;
      })
      .addCase(loadCreatedUsersFromStorageThunk.rejected, (state) => {
        state.is_loading_from_storage = false;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data || [];
        state.current_page = action.payload.page || 1;
        state.total_pages = action.payload.total_pages || null;
        state.per_page = action.payload.per_page || null;
        state.total = action.payload.total || null;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message || 'Error al obtener usuarios';
      })
      .addCase(createUser.pending, (state) => {
        state.is_creating_user = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.is_creating_user = false;
        const new_user = {
          id: action.payload.id || Date.now(),
          first_name: action.payload.name?.split(' ')[0] || action.payload.name,
          last_name: action.payload.name?.split(' ').slice(1).join(' ') || '',
          email: `${action.payload.name?.toLowerCase().replace(/\s+/g, '.')}@reqres.in`,
          job: action.payload.job,
        };
        state.created_users.unshift(new_user);
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.is_creating_user = false;
        state.error = action.payload || action.error.message || 'Error al crear usuario';
      });
  },
});

export default usersSlice.reducer;

