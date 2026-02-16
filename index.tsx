
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Critical Error: #root element not found in DOM.");
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("System Status: Portfolio Kernel Successfully Initialized.");
  } catch (error) {
    console.error("Initialization Failed:", error);
    rootElement.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; background:#0A0A0A; color:#D4FF00; font-family:monospace; padding:20px; text-align:center;">
        <h1 style="font-size:1.5rem; margin-bottom:10px;">BOOT_FAILURE</h1>
        <p style="color:#666; font-size:12px;">React hydration failed. Check console for stack trace.</p>
        <button onclick="window.location.reload()" style="margin-top:20px; padding:10px 20px; background:#D4FF00; color:#000; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">REBOOT SYSTEM</button>
      </div>
    `;
  }
}
