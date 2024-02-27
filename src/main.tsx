import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import JobItemsContextProvider from './contexts/JobItemsContext.tsx';
import JobIdContextProvider from './contexts/JobIdContext.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <JobItemsContextProvider>
        <JobIdContextProvider>
          <App />
        </JobIdContextProvider>
      </JobItemsContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
