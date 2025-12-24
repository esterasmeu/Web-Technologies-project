import { useState, useEffect, useRef } from 'react';
import { useApp } from '../contexts/AppContext';

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

export const ChatBox = ({ chatType }) => {
  const { currentUser, sendMessage, getMessagesForChat, getUserManagerMessages, getManagerAdminMessages } = useApp();
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  const getMessages = () => {
    if (chatType === 'user-manager') {
      return getUserManagerMessages();
    } else if (chatType === 'manager-admin') {
      return getManagerAdminMessages();
    }
    return getMessagesForChat(chatType);
  };

  const messages = getMessages();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (messageText.trim()) {
      sendMessage(chatType, messageText);
      setMessageText('');
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-message ${msg.senderId === currentUser.id ? 'own' : 'other'}`}
          >
            <div className="chat-message-header">
              <strong>{msg.senderName}</strong>
              <span className="chat-time">{formatDateTime(msg.createdAt)}</span>
            </div>
            <div className="chat-message-body">{msg.message}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="chat-input"
          placeholder="Type a message..."
          required
        />
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  );
};
