import { getModal } from '../modals/index.js';

const renderModal = ({ modalInfo, hideModal, socket, channels }) => {
    if (!modalInfo.type) {
      return null;
    }

    const Component = getModal(modalInfo.type);
    return <Component modalInfo={modalInfo} hideModal={hideModal} socket={socket} channels={channels}/>;
};

export default renderModal;