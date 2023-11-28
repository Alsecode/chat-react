import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from 'react-bootstrap';

const ChatForm = ({ channelId, username, socket }) => {
  const inputRef = useRef();

  // Фокус при переключении каналов
  useEffect(() => {
    inputRef.current.focus();
  }, [channelId]);

  const { register, handleSubmit, watch, reset, formState } = useForm();
  const { ref, ...rest } = register('body');
  const messageValue = watch('body') || '';

  const onSubmit = ({ body }) => {
    const sendingMessage = {
      body: body,
      channelId: channelId,
      username: username,
    }
    socket.emit('newMessage', sendingMessage);
    reset();
  }

  return (
    <div className="mt-auto px-5 py-3">
      <Form className="border rounded-2" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="input-group has-validation">
          <Form.Control
            name="body"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2 form-control"
            {...rest}
            ref={(e) => {
              ref(e);
              inputRef.current = e;
            }}
          />
          <Form.Label htmlFor="body" className="visually-hidden">Текст</Form.Label>
          <Button
            type="submit"
            disabled={formState.isSubmitting || !messageValue.trim()}
            className="btn-group-vertical py-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" 
              width="20" height="20" fill="currentColor"><path fillRule="evenodd" 
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 
              2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 
              0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path>
            </svg>
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ChatForm;