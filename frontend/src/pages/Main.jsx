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
import { useTranslation } from 'react-i18next';
import showToast from '../showToast.js';

const MainPage = () => {
  const { t } = useTranslation();
  const { getAuthHeader } = useAuth();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(routes.dataPath(), {
        headers: getAuthHeader(),
      }).catch(() => {
        showToast(t('toasts.error'));
      });
      const {channels, messages, currentChannelId } = data;

      dispatch(channelsActions.addChannels(channels));
      dispatch(messagesActions.addMessages(messages));
      dispatch(currentChannelActions.updateCurrentChannel(currentChannelId));

      setIsLoading(false);
    };

    fetchData();
  }, []);

    if (isLoading === true) {
      return (
        <div className='container h-100'>
          <div className="d-flex h-100 justify-content-center align-items-center">
            <img src={LoadingImage} width='150px' alt={t('extra.loading')} />
          </div>
        </div>
      );
    }
    
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