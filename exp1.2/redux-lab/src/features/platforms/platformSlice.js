import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  platforms: [
    "LinkedIn",
    "Instagram",
    "Facebook",
    "Twitter",
  ],
};

const platformSlice = createSlice({
  name: "platforms",
  initialState,
  reducers: {
    addPlatform: (state, action) => {
      state.platforms.push(action.payload);
    },
  },
});

export const { addPlatform } = platformSlice.actions;

export default platformSlice.reducer;