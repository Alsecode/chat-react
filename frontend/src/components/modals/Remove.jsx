import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import useApi from '../../hooks/useApi';
import showToast from '../../showToast';

const Remove = ({ modalInfo, hideModal }) => {
  const { t } = useTranslation();
  const api = useApi();
  const handleClick = () => {
    api.removeChannel({ id: modalInfo.item.id});
    hideModal();
    showToast('success', t('toasts.removed'));
  }

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>{t('main.channels.modals.remove')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='lead'>{t('main.channels.modals.question')}</p>
        <div className="d-flex justify-content-end gap-2 mt-3">
            <Button variant="secondary" onClick={hideModal}>{t('main.channels.modals.undoBtn')}</Button>
            <Button variant="danger" type="submit" onClick={handleClick}>{t('main.channels.modals.removeBtn')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;