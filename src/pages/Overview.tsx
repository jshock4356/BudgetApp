import React, { useState } from 'react';
import { transactions } from '../data/sampleData';
import { ExpensesChart } from '../components/ExpensesChart';
import { EarningsChart } from '../components/EarningsChart';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Overview: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getMonthTransactions = () => {
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return (
        transactionDate.getMonth() === currentMonth.getMonth() &&
        transactionDate.getFullYear() === currentMonth.getFullYear()
      );
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthTransactions = getMonthTransactions();

  return (
    <div className="space-y-8">
      {/* Month Navigation */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ExpensesChart
          transactions={monthTransactions}
          month={currentMonth}
        />
        <EarningsChart
          transactions={monthTransactions}
          month={currentMonth}
        />
      </div>
    </div>
  );
};