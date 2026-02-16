import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);
  root.render(<App />);
  console.log("Portfolio OS v1.0.0 Online");
}