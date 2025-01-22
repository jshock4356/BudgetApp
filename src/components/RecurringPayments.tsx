import React from 'react';
import { Transaction, Category } from '../types';
import { RefreshCw } from 'lucide-react';

interface Props {
  transactions: Transaction[];
  categories: Category[];
}

export const RecurringPayments: React.FC<Props> = ({ transactions, categories }) => {
  const recurringTransactions = transactions.filter(t => t.isRecurring);

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Uncategorized';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <RefreshCw className="w-6 h-6" />
        Recurring Payments
      </h2>
      <div className="space-y-4">
        {recurringTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <h3 className="font-semibold">{transaction.description}</h3>
              <p className="text-sm text-gray-600">
                {getCategoryName(transaction.category)} - Day {transaction.recurringDay}
              </p>
            </div>
            <span className="font-mono font-semibold">
              ${transaction.amount.toFixed(2)}/month
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};