import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import JobItemsContextProvider from './contexts/JobItemsContext.tsx';
import JobIdContextProvider from './contexts/JobIdContext.tsx';
import BookmarksContextProvider from './contexts/BookmarksContext.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <JobItemsContextProvider>
        <JobIdContextProvider>
          <BookmarksContextProvider>
            <App />
          </BookmarksContextProvider>
        </JobIdContextProvider>
      </JobItemsContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
