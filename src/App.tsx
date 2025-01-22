import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { Overview } from './pages/Overview';
import { Cards } from './pages/Cards';
import { Transactions } from './pages/Transactions';
import { CategoriesPage } from './pages/CategoriesPage';
import { CalendarView } from './pages/CalendarView';
import { RecurringView } from './pages/RecurringView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Overview />} />
          <Route path="/cards" element={<Cards />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/recurring" element={<RecurringView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;