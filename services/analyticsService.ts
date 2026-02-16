
import { VisitorLog, Inquiry, ChatMessage } from '../types';
import { getDeviceType, getBrowserName } from '../utils/helpers.ts';

const STORAGE_KEY = 'rabby_portfolio_analytics';
const INQUIRY_KEY = 'rabby_portfolio_inquiries';
const CHAT_KEY = 'rabby_portfolio_chat';

export const trackVisit = (path: string) => {
  // Direct object creation without waiting for external permissions
  const log: VisitorLog = {
    id: Math.random().toString(36).substring(2, 11),
    ip: '127.0.0.1',
    country: 'Global',
    device: getDeviceType(),
    browser: getBrowserName(),
    timestamp: new Date().toISOString(),
    path: path || '/'
  };

  // Run geo-detection asynchronously via IP only (No GPS requested)
  const fetchGeoInfo = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        log.ip = data.ip || '127.0.0.1';
        log.country = data.country_name || 'Bangladesh';
        
        // Save to storage only after detection is complete or failed
        const existingLogs = getLogs();
        const updatedLogs = [log, ...existingLogs].slice(0, 200);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
      }
    } catch (e) {
      console.warn("Analytics heartbeat failed, but session continues.");
    }
  };

  fetchGeoInfo();
};

export const saveInquiry = (inquiryData: Omit<Inquiry, 'id' | 'timestamp'>) => {
  const inquiry: Inquiry = {
    ...inquiryData,
    id: Math.random().toString(36).substring(2, 11),
    timestamp: new Date().toISOString()
  };
  const existing = getInquiries();
  localStorage.setItem(INQUIRY_KEY, JSON.stringify([inquiry, ...existing]));
  
  saveChatMessage({
    id: inquiry.id,
    sender: 'System',
    text: `Incoming Transmission from ${inquiry.name}: ${inquiry.message.substring(0, 25)}...`,
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
      { id: '1', sender: 'System', text: 'Secure kernel online. Monitoring active.', timestamp: new Date().toISOString() }
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
  
  logs.forEach(log => {
    countries[log.country] = (countries[log.country] || 0) + 1;
  });

  return {
    totalVisits: logs.length,
    totalInquiries: inquiries.length,
    hireRequests: inquiries.filter(i => i.type === 'Hire').length,
    topCountries: Object.entries(countries).sort((a, b) => b[1] - a[1]).slice(0, 5)
  };
};
