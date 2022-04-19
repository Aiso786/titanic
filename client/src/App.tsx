import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.scss';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import HomePage from './modules/homepage';

function App() {
  const queryClient = new QueryClient();
 
  return (
    <div className="container">
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    </div>
  );
}

export default App;
