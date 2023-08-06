import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import worker from '@/mocks/server';

import App from '@/App';

import './styles/reset.css';

if (import.meta.env.DEV) {
  worker.start();
}

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
