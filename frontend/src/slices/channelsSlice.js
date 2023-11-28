import {
    createSlice,
    createEntityAdapter,
  } from '@reduxjs/toolkit';

  const channelsAdapter = createEntityAdapter();

  const initialState = channelsAdapter.getInitialState();

  const slice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        addChannel: channelsAdapter.addOne,
        addChannels: channelsAdapter.addMany,
        renameChannel: channelsAdapter.updateOne,
        removeChannel: channelsAdapter.removeOne,
    }
  });

  export const selectors = channelsAdapter.getSelectors((state) => state.channels);

  export const actions = slice.actions;

  export default slice.reducer;