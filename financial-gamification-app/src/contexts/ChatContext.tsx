import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ChatState, ChatMessage, PersonaType, Persona } from '../types/chat';

const personas: Record<PersonaType, Persona> = {
  'relationship-manager': {
    id: 'relationship-manager',
    name: 'Financial Advisor',
    avatar: '👨‍💼',
    description: 'Your personal financial relationship manager',
    greeting: 'Hello! I\'m your financial advisor. How can I help you with your financial goals today?'
  },
  'ai-coach': {
    id: 'ai-coach',
    name: 'Investment Coach',
    avatar: '👩‍🏫',
    description: 'Your AI investment coach',
    greeting: 'Hi there! Ready to level up your investment knowledge?'
  },
  'ai-tutor': {
    id: 'ai-tutor',
    name: 'Finance Tutor',
    avatar: '🎓',
    description: 'Your personal finance education assistant',
    greeting: 'Welcome! Let\'s explore financial concepts together!'
  }
};

interface ChatContextType {
  state: ChatState;
  sendMessage: (content: string) => void;
  setPersona: (persona: PersonaType) => void;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ChatState>({
    messages: [],
    selectedPersona: 'relationship-manager',
    isTyping: false
  });

  const sendMessage = async (content: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      timestamp: new Date(),
      sender: 'user'
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, newMessage],
      isTyping: true
    }));

    // Simulate Gemini API call (replace with actual implementation)
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'This is a simulated response. Integrate with Gemini API for real responses.',
        timestamp: new Date(),
        sender: 'bot',
        persona: state.selectedPersona
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, botResponse],
        isTyping: false
      }));
    }, 1000);
  };

  const setPersona = (persona: PersonaType) => {
    setState(prev => ({
      ...prev,
      selectedPersona: persona,
      messages: [
        {
          id: Date.now().toString(),
          content: personas[persona].greeting,
          timestamp: new Date(),
          sender: 'bot',
          persona
        }
      ]
    }));
  };

  const clearChat = () => {
    setState(prev => ({
      ...prev,
      messages: [
        {
          id: Date.now().toString(),
          content: personas[prev.selectedPersona].greeting,
          timestamp: new Date(),
          sender: 'bot',
          persona: prev.selectedPersona
        }
      ]
    }));
  };

  return (
    <ChatContext.Provider value={{ state, sendMessage, setPersona, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
