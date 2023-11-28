import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: 0,
}

  const slice = createSlice({
    name: 'currentChannel',
    initialState,
    reducers: {
        updateCurrentChannel: (state, action) => {
            state.id = action.payload;
        }
    }
  });

  export const actions = slice.actions;

  export default slice.reducer;