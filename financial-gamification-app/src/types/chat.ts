export type PersonaType = 'relationship-manager' | 'ai-coach' | 'ai-tutor';

export interface ChatMessage {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'bot';
  persona?: PersonaType;
}

export interface Persona {
  id: PersonaType;
  name: string;
  avatar: string;
  description: string;
  greeting: string;
}

export interface ChatState {
  messages: ChatMessage[];
  selectedPersona: PersonaType;
  isTyping: boolean;
}
