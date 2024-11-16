import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userId: string | null;
  name: string | null;
  token: string | null;
}

const initialState: UserState = {
  userId: null,
  name: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.userId = null;
      state.name = null;
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
