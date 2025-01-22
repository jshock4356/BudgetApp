import React, { useState } from 'react';
import { Transaction, Category } from '../types';
import { Calendar, DollarSign, RefreshCw, Edit2, Check, X } from 'lucide-react';

interface Props {
  transactions: Transaction[];
  categories: Category[];
  onUpdateTransaction?: (transaction: Transaction) => void;
}

export const TransactionList: React.FC<Props> = ({ 
  transactions, 
  categories,
  onUpdateTransaction 
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedDescription, setEditedDescription] = useState('');
  const [editedCategory, setEditedCategory] = useState('');

  const getCategoryColor = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.color || 'bg-gray-500';
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Uncategorized';
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingId(transaction.id);
    setEditedDescription(transaction.description);
    setEditedCategory(transaction.category);
  };

  const handleSave = (transaction: Transaction) => {
    if (onUpdateTransaction) {
      onUpdateTransaction({
        ...transaction,
        description: editedDescription,
        category: editedCategory,
      });
    }
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <DollarSign className="w-6 h-6" />
        Transactions
      </h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className={`w-4 h-4 rounded-full ${getCategoryColor(transaction.category)}`} />
              <div className="flex-1">
                {editingId === transaction.id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                    />
                    <select
                      value={editedCategory}
                      onChange={(e) => setEditedCategory(e.target.value)}
                      className="w-full px-2 py-1 border rounded"
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <>
                    <h3 className="font-semibold">{transaction.description}</h3>
                    <p className="text-sm text-gray-600">
                      {getCategoryName(transaction.category)}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono font-semibold">
                ${transaction.amount.toFixed(2)}
              </span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {new Date(transaction.date).toLocaleDateString()}
                </span>
              </div>
              {transaction.isRecurring && (
                <RefreshCw className="w-4 h-4 text-blue-500" title="Recurring Payment" />
              )}
              {editingId === transaction.id ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(transaction)}
                    className="p-1 text-green-600 hover:text-green-800"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-1 text-red-600 hover:text-red-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEdit(transaction)}
                  className="p-1 text-gray-600 hover:text-gray-800"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};