import React from 'react';
import { Calendar } from '../components/Calendar';
import { transactions } from '../data/sampleData';

export const CalendarView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <Calendar transactions={transactions} />
    </div>
  );
};