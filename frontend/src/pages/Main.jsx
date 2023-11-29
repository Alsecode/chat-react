import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { routes } from '../routes.js';

import { actions as channelsActions }from '../slices/channelsSlice.js';
import { actions as messagesActions }from '../slices/messagesSlice.js';
import { actions as currentChannelActions }from '../slices/currentChannelSlice.js';

import Channels from '../components/channels/Channels.jsx';
import Chat from '../components/chat/Chat.jsx';
import useAuth from '../hooks/useAuth.jsx';
import LoadingImage from "../img/loading.png";

const MainPage = () => {
  const { getAuthHeader } = useAuth();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      console.log(getAuthHeader);
      const { data } = await axios.get(routes.dataPath(), {
        headers: getAuthHeader(),
      });
      const {channels, messages, currentChannelId } = data;

      dispatch(channelsActions.addChannels(channels));
      dispatch(messagesActions.addMessages(messages));
      dispatch(currentChannelActions.updateCurrentChannel(currentChannelId));

      setIsLoading(false);
    };

    fetchData();
  }, [dispatch, getAuthHeader]);

  //ПОМЕНЯТЬ ЭТО НА КАРТИНКУ ЗАГРУЗКИ!!!
    if (isLoading === true) {
      return <img src={LoadingImage} width='500px' alt='Загрузка'/>;
    }
    
    console.log('а теперь тут');

    return (
        <div className='container h-100 overflow-hidden my-4 shadow'>
          <div className="row h-100 justify-content-center">
            <div className="col-12 bg-white mh-100">
                <div className='row h-100'>
                    <div className="col-md-2 col-4 border-end h-100 bg-light px-0">
                      <Channels/>
                    </div>
                  <div className="col p-0 d-flex flex-column h-100">
                    <Chat/>
                  </div> 
                </div>
            </div>
          </div>
        </div>

    )
};
  
  export default MainPage;