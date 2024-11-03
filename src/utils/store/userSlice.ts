import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  username: string;
  email: string;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  id: "",
  username: "",
  email: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Omit<UserState, "isLoggedIn">>) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.id = "";
      state.username = "";
      state.email = "";
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
