
import { VisitorLog, Inquiry, ChatMessage } from '../types';
import { getDeviceType, getBrowserName } from '../utils/helpers';

const STORAGE_KEY = 'rabby_portfolio_analytics';
const INQUIRY_KEY = 'rabby_portfolio_inquiries';
const CHAT_KEY = 'rabby_portfolio_chat';

export const trackVisit = async (path: string) => {
  // Define default data immediately
  const log: VisitorLog = {
    id: Math.random().toString(36).substr(2, 9),
    ip: 'Scanning...',
    country: 'Detecting...',
    device: getDeviceType(),
    browser: getBrowserName(),
    timestamp: new Date().toISOString(),
    path: path || '/'
  };

  // Run geo-tracking in the background without awaiting for the UI to move on
  const runTracking = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        log.ip = data.ip || '127.0.0.1';
        log.country = data.country_name || 'Bangladesh';
      }
    } catch (error) {
      log.ip = '127.0.0.1';
      log.country = 'Local';
    } finally {
      const existingLogs = getLogs();
      const updatedLogs = [log, ...existingLogs].slice(0, 500);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
    }
  };

  runTracking();
};

export const saveInquiry = (inquiryData: Omit<Inquiry, 'id' | 'timestamp'>) => {
  const inquiry: Inquiry = {
    ...inquiryData,
    id: Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString()
  };
  const existing = getInquiries();
  localStorage.setItem(INQUIRY_KEY, JSON.stringify([inquiry, ...existing]));
  
  // Also push to chat history as a system notification
  saveChatMessage({
    id: inquiry.id,
    sender: 'System',
    text: `New lead from ${inquiry.name}: ${inquiry.message.substring(0, 30)}...`,
    timestamp: inquiry.timestamp
  });
};

export const getInquiries = (): Inquiry[] => {
  try {
    const data = localStorage.getItem(INQUIRY_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
};

export const getLogs = (): VisitorLog[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
};

export const saveChatMessage = (msg: ChatMessage) => {
  const existing = getChatMessages();
  localStorage.setItem(CHAT_KEY, JSON.stringify([...existing, msg]));
};

export const getChatMessages = (): ChatMessage[] => {
  try {
    const data = localStorage.getItem(CHAT_KEY);
    return data ? JSON.parse(data) : [
      { id: '1', sender: 'System', text: 'Kernel ready. Dashboard initialized.', timestamp: new Date().toISOString() }
    ];
  } catch { return []; }
};

export const exportAllData = () => {
  const data = {
    logs: getLogs(),
    inquiries: getInquiries(),
    chat: getChatMessages(),
    exportedAt: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `rabby_systems_dump_${new Date().getTime()}.json`;
  a.click();
};

export const getStatsSummary = () => {
  const logs = getLogs();
  const inquiries = getInquiries();
  const countries: Record<string, number> = {};
  const browsers: Record<string, number> = {};
  const devices: Record<string, number> = {};

  logs.forEach(log => {
    countries[log.country] = (countries[log.country] || 0) + 1;
    browsers[log.browser] = (browsers[log.browser] || 0) + 1;
    devices[log.device] = (devices[log.device] || 0) + 1;
  });

  return {
    totalVisits: logs.length,
    totalInquiries: inquiries.length,
    hireRequests: inquiries.filter(i => i.type === 'Hire').length,
    topCountries: Object.entries(countries).sort((a, b) => b[1] - a[1]).slice(0, 5),
    browsers,
    devices
  };
};
