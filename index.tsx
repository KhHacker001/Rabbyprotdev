
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Kernel: Online");
  } catch (err: any) {
    console.error("Critical Kernel Error:", err);
    // UI Fallback if rendering fails
    container.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; background:#0A0A0A; color:#D4FF00; font-family:monospace; text-align:center; padding: 20px;">
        <h1 style="font-size:1.5rem; margin-bottom:10px; letter-spacing: 2px;">BOOT_FAILURE</h1>
        <p style="color:#666; font-size: 0.8rem; max-width: 400px; margin-bottom: 20px;">${err?.message || 'Unknown system error occurred during initialization.'}</p>
        <button onclick="location.reload()" style="padding:12px 24px; background:#D4FF00; color:black; border:none; border-radius:12px; cursor:pointer; font-weight:bold; font-family: inherit; font-size: 0.7rem; letter-spacing: 1px;">REBOOT SYSTEM</button>
      </div>
    `;
  }
} else {
  console.error("DOM Error: Root element not found.");
}
