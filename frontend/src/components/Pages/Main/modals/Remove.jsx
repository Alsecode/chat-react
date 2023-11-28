import { Modal, Button } from 'react-bootstrap';

const Remove = ({modalInfo, hideModal, socket}) => {
  const handleClick = () => {
    socket.emit('removeChannel', { id: modalInfo.item.id});
    hideModal();
  }

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='lead'>Уверены?</p>
        <div className="d-flex justify-content-end gap-2 mt-3">
            <Button variant="secondary" onClick={hideModal}>Отменить</Button>
            <Button variant="danger" type="submit" onClick={handleClick}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;