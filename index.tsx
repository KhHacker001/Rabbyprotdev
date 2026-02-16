
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("System Online");
  } catch (err: any) {
    console.error("Boot Error:", err);
    container.innerHTML = `<div style="color:red; padding:20px; font-family:monospace;">BOOT_FAILURE: ${err.message}</div>`;
  }
}
