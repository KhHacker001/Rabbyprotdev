
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl: string;
}

export interface Skill {
  name: string;
  icon: string;
  level: number;
  category: 'Backend' | 'Frontend' | 'Database' | 'Tools';
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface VisitorLog {
  id: string;
  ip: string;
  country: string;
  device: string;
  browser: string;
  timestamp: string;
  path: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  message: string;
  type: 'General' | 'Hire';
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'Admin' | 'System' | string;
  text: string;
  timestamp: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
}
