
import { VisitorLog, Inquiry } from '../types';
import { getDeviceType, getBrowserName } from '../utils/helpers';

const STORAGE_KEY = 'rabby_portfolio_analytics';
const INQUIRY_KEY = 'rabby_portfolio_inquiries';

export const trackVisit = async (path: string) => {
  let geoData = {
    ip: 'Local/Protected',
    country_name: 'Unknown'
  };

  try {
    const response = await fetch('https://ipapi.co/json/', { 
      mode: 'cors',
      credentials: 'omit' 
    });
    
    if (response.ok) {
      const data = await response.json();
      geoData.ip = data.ip || geoData.ip;
      geoData.country_name = data.country_name || geoData.country_name;
    }
  } catch (error) {}

  try {
    const log: VisitorLog = {
      id: Math.random().toString(36).substr(2, 9),
      ip: geoData.ip,
      country: geoData.country_name,
      device: getDeviceType(),
      browser: getBrowserName(),
      timestamp: new Date().toISOString(),
      path: path || '/'
    };

    const existingLogs = getLogs();
    const updatedLogs = [log, ...existingLogs].slice(0, 100);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
  } catch (error) {
    console.error('Persistent analytics storage failed:', error);
  }
};

export const saveInquiry = (inquiryData: Omit<Inquiry, 'id' | 'timestamp'>) => {
  try {
    const inquiry: Inquiry = {
      ...inquiryData,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    };
    const existing = getInquiries();
    localStorage.setItem(INQUIRY_KEY, JSON.stringify([inquiry, ...existing]));
  } catch (error) {
    console.error('Failed to save inquiry:', error);
  }
};

export const getInquiries = (): Inquiry[] => {
  try {
    const data = localStorage.getItem(INQUIRY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const getLogs = (): VisitorLog[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
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
