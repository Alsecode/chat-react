import { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import AuthContext from '../../../contexts';
import { useDispatch } from 'react-redux';
import { routes } from '../../../routes';

import { actions as channelsActions }from '../../../slices/channelsSlice.js';
import { actions as messagesActions }from '../../../slices/messagesSlice.js';
import { actions as currentChannelActions }from '../../../slices/currentChannelSlice.js';

import Channels from './Channels/Channels.jsx';
import Chat from './Chat/Chat.jsx';

import io from 'socket.io-client';
const socket = io('http://localhost:3000/');

const MainPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = JSON.parse(localStorage.getItem('userId')).token;
      const { data } = await axios.get(routes.dataPath(), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const {channels, messages, currentChannelId } = data;

      dispatch(channelsActions.addChannels(channels));
      dispatch(messagesActions.addMessages(messages));
      dispatch(currentChannelActions.updateCurrentChannel(currentChannelId));

      setIsLoading(false);
    };
    fetchData();
    console.log('fllo');
  }, [dispatch]);

  //ПОМЕНЯТЬ ЭТО НА КАРТИНКУ ЗАГРУЗКИ!!!
    if (isLoading === true) {
      return null;
    }
    
    console.log('а теперь тут');

    return (
        <div className='container h-100 overflow-hidden my-4 shadow'>
          <div className="row h-100 justify-content-center">
            <div className="col-12 bg-white mh-100">
                <div className='row h-100'>
                    <div className="col-md-2 col-4 border-end h-100 bg-light px-0">
                      <Channels socket={socket}/>
                    </div>
                  <div className="col p-0 d-flex flex-column h-100">
                    <Chat socket={socket}/>
                  </div> 
                </div>
            </div>
          </div>
        </div>

    )
};
  
  export default MainPage;