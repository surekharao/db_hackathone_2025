import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../../contexts/ChatContext';
import { PersonaType } from '../../types/chat';
import './ChatUI.css';

export const ChatUI: React.FC = () => {
  const { state, sendMessage, setPersona, clearChat } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const personas: { id: PersonaType; name: string; avatar: string }[] = [
    { id: 'relationship-manager', name: 'Financial Advisor', avatar: '👨‍💼' },
    { id: 'ai-coach', name: 'Investment Coach', avatar: '👩‍🏫' },
    { id: 'ai-tutor', name: 'Finance Tutor', avatar: '🎓' }
  ];

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="persona-selector">
          {personas.map(persona => (
            <button
              key={persona.id}
              className={`persona-button ${state.selectedPersona === persona.id ? 'active' : ''}`}
              onClick={() => setPersona(persona.id)}
            >
              <span className="persona-avatar">{persona.avatar}</span>
              <span className="persona-name">{persona.name}</span>
            </button>
          ))}
        </div>
        <button className="clear-chat" onClick={clearChat}>
          Clear Chat
        </button>
      </div>

      <div className="messages-container">
        {state.messages.map(message => (
          <div
            key={message.id}
            className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
          >
            {message.sender === 'bot' && (
              <div className="bot-avatar">
                {personas.find(p => p.id === message.persona)?.avatar || '🤖'}
              </div>
            )}
            <div className="message-content">
              <p>{message.content}</p>
              <span className="timestamp">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        {state.isTyping && (
          <div className="message bot">
            <div className="bot-avatar">
              {personas.find(p => p.id === state.selectedPersona)?.avatar}
            </div>
            <div className="message-content typing">
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input-container">
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          rows={1}
          className="chat-input"
        />
        <button type="submit" className="send-button" disabled={!input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
};
