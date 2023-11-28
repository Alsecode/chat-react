import {
    createSlice,
    createEntityAdapter,
  } from '@reduxjs/toolkit';

  import { actions as channelsActions } from './channelsSlice';

  const messagesAdapter = createEntityAdapter();

  const initialState = messagesAdapter.getInitialState();

  const slice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: messagesAdapter.addOne,
        addMessages: messagesAdapter.addMany,
        removeMessages: messagesAdapter.removeMany,
    },
    extraReducers: (builder) => {
      builder.addCase(channelsActions.removeChannel, (state, action) => {
        // Удаление сообщений канала при удалении канала
        const channelId = action.payload;
        const restEntities = Object.values(state.entities).filter((item) => item.channelId !== channelId);
        messagesAdapter.setAll(state, restEntities);
      });
    },
  });

  export const selectors = messagesAdapter.getSelectors((state) => state.messages);

  export const actions = slice.actions;

  export default slice.reducer;