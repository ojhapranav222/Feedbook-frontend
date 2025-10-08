import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  isAuthenticated: false,
  authLoading: true, // Start in a loading state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      state.authLoading = false;
      if (typeof window !== 'undefined' && action.payload) {
        localStorage.setItem('access_token', action.payload);
      }
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.authLoading = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
      }
    },
    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
  },
});

export const { setToken, clearToken, setAuthLoading } = authSlice.actions;
export default authSlice.reducer;
