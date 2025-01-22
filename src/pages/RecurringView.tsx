import React from 'react';
import { RecurringPayments } from '../components/RecurringPayments';
import { transactions, categories } from '../data/sampleData';

export const RecurringView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <RecurringPayments
        transactions={transactions}
        categories={categories}
      />
    </div>
  );
};