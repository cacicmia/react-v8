import { createSlice } from '@reduxjs/toolkit';

export const searchPetSlice = createSlice({
  name: 'searchPet',
  initialState: {
    value: {
      location: '',
      breed: '',
      animal: '',
    },
  },
  reducers: {
    all: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { all } = searchPetSlice.actions;
export default searchPetSlice.reducer;
