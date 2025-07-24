import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import { UserProvider } from './context/UserContext';
import { ResumeProvider } from './context/ResumeContext';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ResumeProvider>
          <App />
        </ResumeProvider>
      </UserProvider>
    </QueryClientProvider>
  </BrowserRouter>
</React.StrictMode>
);
