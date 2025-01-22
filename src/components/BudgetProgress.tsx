import React, { useState } from 'react';
import { Category, Transaction } from '../types';
import { DollarSign, AlertTriangle } from 'lucide-react';
import * as Icons from 'lucide-react';

interface Props {
  category: Category;
  transactions: Transaction[];
  onUpdateBudget: (categoryId: string, budget: number) => void;
}

export const BudgetProgress: React.FC<Props> = ({
  category,
  transactions,
  onUpdateBudget,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [budgetInput, setBudgetInput] = useState(
    category.budget?.toString() || ''
  );

  const Icon = Icons[category.icon as keyof typeof Icons] || Icons.Folder;

  // Calculate total spending for this category
  const totalSpent = Math.abs(
    transactions
      .filter((t) => t.category === category.id && t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const budget = category.budget || 0;
  const percentageUsed = budget > 0 ? (totalSpent / budget) * 100 : 0;
  const remaining = Math.max(budget - totalSpent, 0);

  const getProgressColor = () => {
    if (percentageUsed >= 100) return 'bg-red-500';
    if (percentageUsed >= 85) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBudget = parseFloat(budgetInput);
    if (!isNaN(newBudget) && newBudget >= 0) {
      onUpdateBudget(category.id, newBudget);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${category.color} flex items-center justify-center`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{category.name}</h3>
            {budget > 0 && percentageUsed >= 85 && (
              <div className="flex items-center gap-1 text-yellow-600 text-sm mt-1">
                <AlertTriangle className="w-4 h-4" />
                {percentageUsed >= 100 ? 'Over budget' : 'Approaching limit'}
              </div>
            )}
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <div className="relative">
              <DollarSign className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="number"
                value={budgetInput}
                onChange={(e) => setBudgetInput(e.target.value)}
                className="pl-8 pr-2 py-1 border rounded-lg w-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter budget"
                step="0.01"
                min="0"
                required
              />
            </div>
            <button
              type="submit"
              className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </form>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            {budget > 0 ? 'Edit Budget' : 'Set Budget'}
          </button>
        )}
      </div>

      {budget > 0 && (
        <div className="space-y-3">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${getProgressColor()} transition-all duration-500`}
              style={{ width: `${Math.min(percentageUsed, 100)}%` }}
            />
          </div>

          <div className="flex justify-between text-sm">
            <div>
              <p className="text-gray-600">Spent</p>
              <p className="font-semibold">${totalSpent.toFixed(2)}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-600">Budget</p>
              <p className="font-semibold">${budget.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">Remaining</p>
              <p className="font-semibold">${remaining.toFixed(2)}</p>
            </div>
          </div>

          <div className="text-sm text-gray-600 text-right">
            {percentageUsed.toFixed(1)}% used
          </div>
        </div>
      )}
    </div>
  );
};