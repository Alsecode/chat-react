import { useDispatch } from 'react-redux';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { actions as currentChannelActions } from '../../slices/currentChannelSlice.js';

const Channel = ({ channel, showModal, currentChannel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const changeChannel = (id) => {
    dispatch(currentChannelActions.updateCurrentChannel(id));
  };

  const channelClass = cn('w-100', 'd-inline-flex', 'rounded-0', 'btn', 'text-truncate', {
    'btn-primary': channel.id === currentChannel.id,
  });

  const variant = channel.id === currentChannel.id ? 'primary' : 'white';

  const mainButton = (
    <button type="button" className={channelClass} onClick={() => changeChannel(channel.id)}>
      <span className="me-1">#</span>
      <p className="m-0 text-truncate">{channel.name}</p>
    </button>
  );

  if (channel.removable === false) {
    return mainButton;
  }

  return (
    <Dropdown as={ButtonGroup} className="w-100">
      {mainButton}
      <Dropdown.Toggle split variant={variant} id="dropdown-split-basic" className="rounded-0" />
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => showModal('removing', channel)}>{t('main.channels.modals.removeBtn')}</Dropdown.Item>
        <Dropdown.Item onClick={() => showModal('renaming', channel)}>{t('main.channels.modals.renameBtn')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Channel;
