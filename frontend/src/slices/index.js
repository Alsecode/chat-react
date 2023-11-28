import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import currentChannelReducer from './currentChannelSlice';

export default configureStore({
    reducer: {
        currentChannel: currentChannelReducer,
        channels: channelsReducer,
        messages: messagesReducer,
    }
});
