import { useEffect, useRef } from 'react';

const Messages = ({ items }) => {
  const scrollRef = useRef();
  const messagesCount = items.length;

  // Прокрутка вниз при появлении нового сообщения
  useEffect(() => {
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messagesCount]);

  return (
    <div className="overflow-auto px-5 scroll-block bg-dark" ref={scrollRef}>
      {items.map((message) => (
        <p className="mb-2 text-break" key={message.id}>
          <b>
            {message.username}
            :
            {' '}
          </b>
          {message.body}
        </p>
      ))}
    </div>
  );
};

export default Messages;
