import { useEffect, useRef } from 'react';
import { Modal, FormGroup, FormControl, FormLabel, Button } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import { yupResolver } from "@hookform/resolvers/yup";

import schemas from '../../schemas/index.js';
import useApi from '../../hooks/useApi.jsx';

const Add = ({hideModal, channels}) => {
  const { t } = useTranslation();
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const api = useApi();

  const channelsNames = channels.map((channel) => channel.name);
  
  const yupSchema = schemas.channel(channelsNames);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(yupSchema),
  });
  const { ref, ...rest } = register('name');

  const onSubmit = ({ name }) => {
    api.newChannel({ name: `${name.trim()}` });
    hideModal();
  }

  const errorText = errors.name ? `main.channels.modals.errors.${errors.name.message}` : null;

  return (
    <Modal show centered>
      <Modal.Header closeButton onHide={hideModal}>
        <Modal.Title>{t('main.channels.modals.add')}</Modal.Title>
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
            <div className="invalid-feedback">{t(errorText)}</div>
          </FormGroup>
          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button variant="secondary" onClick={hideModal}>{t('main.channels.modals.undoBtn')}</Button>
            <Button variant="primary" type="submit">{t('main.channels.modals.sendBtn')}</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;