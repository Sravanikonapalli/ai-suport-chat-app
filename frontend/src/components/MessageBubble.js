export default function MessageBubble({ sender, content }) {
  return (
    <div className={sender === 'user' ? 'text-right' : 'text-left'}>
      <div style={{
        display: 'inline-block',
        background: sender === 'user' ? '#DCF8C6' : '#EEE',
        padding: '10px',
        borderRadius: '10px',
        margin: '5px'
      }}>
        {content}
      </div>
    </div>
  );
}
