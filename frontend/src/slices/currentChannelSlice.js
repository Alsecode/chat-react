import { createSlice } from '@reduxjs/toolkit';

import { actions as channelsActions } from './channelsSlice';

const initialState = {
  id: 0,
};

const slice = createSlice({
  name: 'currentChannel',
  initialState,
  reducers: {
    updateCurrentChannel: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.id = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, action) => {
      // Перемещение в основной канал при удалении текущего
      const channelId = action.payload;
      const mainChannelId = 1;
      if (channelId === state.id) {
        // eslint-disable-next-line no-param-reassign
        state.id = mainChannelId;
      }
    });
  },
});

export const { actions } = slice;

export default slice.reducer;
