import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { chatStore } from '../store/ChatStore';
import MessageBubble from './MessageBubble';

const Chat = observer(() => {
  const [input, setInput] = useState('');
  const userId = 'user123';

  useEffect(() => {
    chatStore.loadHistory(userId);
  }, []);

  const send = () => {
    if (input.trim()) {
      chatStore.sendMessage(userId, input);
      setInput('');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ height: 400, overflowY: 'scroll' }}>
        {chatStore.messages.map((msg, i) => (
          <MessageBubble key={i} {...msg} />
        ))}
      </div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  );
});

export default Chat;
