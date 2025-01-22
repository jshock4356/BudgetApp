import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Transaction } from '../types';
import { categories } from '../data/sampleData';
import { DollarSign } from 'lucide-react';

interface Props {
  transactions: Transaction[];
  month: Date;
}

interface CategoryExpense {
  name: string;
  amount: number;
  color: string;
}

export const ExpensesChart: React.FC<Props> = ({ transactions, month }) => {
  const getCategoryExpenses = (): CategoryExpense[] => {
    const expensesByCategory = new Map<string, number>();
    const categoryColors = new Map(categories.map(cat => [cat.id, cat.color.replace('bg-', '')]));

    transactions.forEach(transaction => {
      if (transaction.amount < 0) { // Only consider expenses (negative amounts)
        const currentAmount = expensesByCategory.get(transaction.category) || 0;
        expensesByCategory.set(transaction.category, currentAmount + Math.abs(transaction.amount));
      }
    });

    return Array.from(expensesByCategory.entries()).map(([categoryId, amount]) => {
      const category = categories.find(c => c.id === categoryId);
      return {
        name: category?.name || 'Other',
        amount: amount,
        color: categoryColors.get(categoryId) || 'gray-500'
      };
    }).sort((a, b) => b.amount - a.amount);
  };

  const totalExpenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const data = getCategoryExpenses();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <DollarSign className="w-7 h-7 text-red-600" />
          Monthly Expenses
        </h2>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Expenses</p>
          <p className="text-2xl font-bold text-red-600">
            ${totalExpenses.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={70}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              tickFormatter={(value) => `$${value}`}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '0.5rem',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Bar
              dataKey="amount"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};