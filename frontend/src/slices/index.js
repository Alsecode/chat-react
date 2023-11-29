import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import currentChannelReducer from './currentChannelSlice';

const initStore = () => configureStore({
    reducer: {
        currentChannel: currentChannelReducer,
        channels: channelsReducer,
        messages: messagesReducer,
    }
});

export default initStore;
