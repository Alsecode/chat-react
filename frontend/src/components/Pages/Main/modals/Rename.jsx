import { useEffect, useRef } from 'react';
import { Modal, FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import schemas from '../../../../schemas/index.js';

const Rename = ({modalInfo, hideModal, socket, channels}) => {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.select();
  }, []);

  const channelsNames = channels.map((channel) => channel.name);

  const yupSchema = schemas.channel(channelsNames);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: { name: `${modalInfo.item.name}` },
  });
  const { ref, ...rest } = register('name');

  const onSubmit = ({ name }) => {
    socket.emit('renameChannel', { id: modalInfo.item.id, name: `${name.trim()}`});
    hideModal();
  }
    
  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup>
            <FormControl
              name='name'
              isInvalid={errors.name}
              {...rest}
              ref={(e) => {
                ref(e);
                inputRef.current = e;
              }}
            />
            <FormLabel htmlFor="name" className="visually-hidden">Название</FormLabel>
            <div className="invalid-feedback">{errors.name?.message}</div>
          </FormGroup>
          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button variant="secondary" onClick={hideModal}>Отменить</Button>
            <Button variant="primary" type="submit">Отправить</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;