export interface Message {
  id: string;
  content: string;
  delay: number;
}

export interface Campaign {
  id: string;
  name: string;
  messages: Message[];
  status: 'active' | 'paused' | 'completed';
  targetUsers: string[];
}

export interface InstagramCredentials {
  username: string;
  password: string;
}
