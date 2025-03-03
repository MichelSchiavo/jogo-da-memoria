import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Console message for branding
console.log(
  '%c🎮 Jogo da Memória %c\nCriado por Michel Schiavo\nhttps://github.com/MichelSchiavo',
  'color: #FFDE00; background: #3B4CCA; font-size: 20px; padding: 5px; border-radius: 5px 5px 0 0; font-weight: bold;',
  'color: #FFF; background: #FF0000; font-size: 12px; padding: 5px; border-radius: 0 0 5px 5px;',
);

// Register service worker for offline capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Analytics />
    <App />
  </React.StrictMode>,
);
