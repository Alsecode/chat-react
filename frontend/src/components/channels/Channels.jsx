import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {selectors as channelsSelectors } from '../../slices/channelsSlice.js';

import renderModal from '../modals/renderModal.js';
import Channel from './Channel.jsx';

const Channels = () => {
  const { t } = useTranslation();

    const [modalInfo, setModalInfo] = useState({ type: null, item: null });
    const hideModal = () => setModalInfo({ type: null, item: null });
    const showModal = (type, item = null, allItems = null) => setModalInfo({ type, item, allItems});

    const channels = useSelector(channelsSelectors.selectAll);
    const channelsCount = channels.length;
    const prevChannelsCountRef = useRef(channels.length);

    const scrollRef = useRef();

    const currentChannel = useSelector((state) => state.currentChannel);
    const currentChannelId = currentChannel.id;

        // Прокрутка при удалении или добавлении канала
        useEffect(() => {
          const channelCountChanged = prevChannelsCountRef.current !== channelsCount;

          if (channelCountChanged && channelsCount > prevChannelsCountRef.current) {
            scrollRef.current.scrollTo({
              top: scrollRef.current.scrollHeight,
              behavior: "smooth"
            });
          }

          if (channelCountChanged && currentChannelId === 1) {
            scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
          }

          prevChannelsCountRef.current = channelsCount;
        }, [channelsCount, currentChannelId]);

    return (
        <div className='d-flex flex-column h-100'>
            <div className='d-flex p-4 mt-1 mb-2 justify-content-between pe-2'>
                <b>{t('main.channels.header')}</b>
                <button 
                  type='button'
                  className='btn text-primary btn-group-vertical p-0'
                  onClick={() => showModal('adding')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                  </svg>
                </button>
            </div>
            <ul className="nav ps-2 overflow-auto scroll-block mb-2 h-100 d-block" ref={scrollRef}>
                {channels.map((channel) => {
                  return (
                    <li className='nav-item w-100 ' key={channel.id}>
                      <Channel channel={channel} showModal={showModal} currentChannel={currentChannel} />
                    </li>
                  );
                })}
            </ul>
            {renderModal({ modalInfo, hideModal, channels })}
        </div>
    );
};

export default Channels;