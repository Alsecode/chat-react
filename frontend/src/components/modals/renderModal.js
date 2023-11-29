import { getModal } from './index.js';

const renderModal = ({ modalInfo, hideModal, channels }) => {
    if (!modalInfo.type) {
      return null;
    }

    const Component = getModal(modalInfo.type);
    return <Component modalInfo={modalInfo} hideModal={hideModal} channels={channels}/>;
};

export default renderModal;