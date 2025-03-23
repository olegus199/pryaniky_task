import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  token: string | null;
}

const initialState: InitialState = {
  token: null,
};

const authTokenSlice = createSlice({
  name: "authToken",
  initialState,
  reducers: {
    tokenChanged(state: InitialState, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
  selectors: {
    selectToken: state => state.token,
  },
});

export default authTokenSlice.reducer;

export const { tokenChanged } = authTokenSlice.actions;

export const { selectToken } = authTokenSlice.selectors;