import { VisitorLog, Inquiry, ChatMessage } from '../types';
import { getDeviceType, getBrowserName } from '../utils/helpers.ts';

const STORAGE_KEY = 'rabby_analytics';
const INQUIRY_KEY = 'rabby_inquiries';
const CHAT_KEY = 'rabby_chat';

const getFromStore = <T>(key: string, def: T): T => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : def;
  } catch { return def; }
};

const saveToStore = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) { console.error("Storage Error", e); }
};

export const trackVisit = (path: string) => {
  const log: VisitorLog = {
    id: Math.random().toString(36).substring(2, 11),
    ip: 'Session-Local',
    country: 'Local',
    device: getDeviceType(),
    browser: getBrowserName(),
    timestamp: new Date().toISOString(),
    path: path || '/'
  };

  const logs = getLogs();
  saveToStore(STORAGE_KEY, [log, ...logs].slice(0, 100));
};

export const saveInquiry = (inquiryData: Omit<Inquiry, 'id' | 'timestamp'>) => {
  const inquiry: Inquiry = {
    ...inquiryData,
    id: Math.random().toString(36).substring(2, 11),
    timestamp: new Date().toISOString()
  };
  const existing = getInquiries();
  saveToStore(INQUIRY_KEY, [inquiry, ...existing]);
};

export const getInquiries = (): Inquiry[] => getFromStore(INQUIRY_KEY, []);
export const getLogs = (): VisitorLog[] => getFromStore(STORAGE_KEY, []);
export const getChatMessages = (): ChatMessage[] => getFromStore(CHAT_KEY, []);

export const saveChatMessage = (msg: ChatMessage) => {
  const existing = getChatMessages();
  saveToStore(CHAT_KEY, [...existing, msg]);
};

export const getStatsSummary = () => {
  const logs = getLogs();
  const inquiries = getInquiries();
  return {
    totalVisits: logs.length,
    totalInquiries: inquiries.length,
    hireRequests: inquiries.filter(i => i.type === 'Hire').length,
    topCountries: [['Local', logs.length]]
  };
};

export const exportAllData = () => {
  const data = { logs: getLogs(), inquiries: getInquiries(), exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `rabby_data_dump.json`;
  a.click();
};