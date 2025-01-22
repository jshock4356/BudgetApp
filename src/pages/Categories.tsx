import React, { useState } from 'react';
import { Category, Transaction } from '../types';
import * as Icons from 'lucide-react';
import { Tags, Plus, Trash2, Edit2, Check, X, ChevronRight, ChevronDown, DollarSign, AlertTriangle } from 'lucide-react';
import { transactions } from '../data/sampleData';

interface Props {
  categories: Category[];
  onAddCategory: (category: Omit<Category, 'id'>) => void;
  onUpdateCategory: (category: Category) => void;
  onDeleteCategory: (id: string) => void;
}

export const Categories: React.FC<Props> = ({
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}) => {
  const [newCategory, setNewCategory] = useState({ 
    name: '', 
    color: 'bg-blue-500',
    icon: 'Folder',
    parentId: undefined
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedColor, setEditedColor] = useState('');
  const [editedIcon, setEditedIcon] = useState('');
  const [editedParentId, setEditedParentId] = useState<string | undefined>(undefined);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [editingBudgetId, setEditingBudgetId] = useState<string | null>(null);
  const [budgetInput, setBudgetInput] = useState('');

  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
  ];

  const commonIcons = [
    'Home', 'Car', 'UtensilsCrossed', 'Lightbulb', 'Tv', 'ShoppingBag', 
    'Plane', 'Bus', 'Train', 'Briefcase', 'Heart', 'Smartphone', 'Book',
    'Dumbbell', 'Music', 'Coffee', 'Gift', 'Wallet'
  ];

  const toggleExpand = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleAddCategory = () => {
    if (newCategory.name.trim()) {
      onAddCategory(newCategory);
      setNewCategory({ 
        name: '', 
        color: 'bg-blue-500', 
        icon: 'Folder',
        parentId: undefined 
      });
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setEditedName(category.name);
    setEditedColor(category.color);
    setEditedIcon(category.icon);
    setEditedParentId(category.parentId);
  };

  const handleSave = (category: Category) => {
    onUpdateCategory({
      ...category,
      name: editedName,
      color: editedColor,
      icon: editedIcon,
      parentId: editedParentId,
    });
    setEditingId(null);
  };

  const handleBudgetEdit = (category: Category) => {
    setEditingBudgetId(category.id);
    setBudgetInput(category.budget?.toString() || '');
  };

  const handleBudgetSave = (category: Category) => {
    const newBudget = parseFloat(budgetInput);
    if (!isNaN(newBudget) && newBudget >= 0) {
      onUpdateCategory({
        ...category,
        budget: newBudget
      });
    }
    setEditingBudgetId(null);
  };

  const getParentCategories = () => {
    return categories.filter(category => !category.parentId);
  };

  const getChildCategories = (parentId: string) => {
    return categories.filter(category => category.parentId === parentId);
  };

  const getCategoryBalance = (categoryId: string): number => {
    const category = categories.find(c => c.id === categoryId);
    const children = getChildCategories(categoryId);
    const childrenBalance = children.reduce((sum, child) => sum + (child.balance || 0), 0);
    return (category?.balance || 0) + childrenBalance;
  };

  const getCategorySpending = (categoryId: string): number => {
    return Math.abs(
      transactions
        .filter((t) => t.category === categoryId && t.amount < 0)
        .reduce((sum, t) => sum + t.amount, 0)
    );
  };

  const getBudgetProgress = (category: Category) => {
    const totalSpent = getCategorySpending(category.id);
    const budget = category.budget || 0;
    const percentageUsed = budget > 0 ? (totalSpent / budget) * 100 : 0;
    
    const getProgressColor = () => {
      if (percentageUsed >= 100) return 'bg-red-500';
      if (percentageUsed >= 85) return 'bg-yellow-500';
      return 'bg-green-500';
    };

    return {
      totalSpent,
      budget,
      percentageUsed,
      color: getProgressColor()
    };
  };

  const renderCategory = (category: Category, level = 0) => {
    const Icon = Icons[category.icon as keyof typeof Icons] || Icons.Folder;
    const hasChildren = getChildCategories(category.id).length > 0;
    const isExpanded = expandedCategories.has(category.id);
    const totalBalance = getCategoryBalance(category.id);
    const { totalSpent, budget, percentageUsed, color: progressColor } = getBudgetProgress(category);

    return (
      <div key={category.id} className="group">
        <div className={`transition-all duration-200 ease-in-out ${level > 0 ? 'ml-6' : ''}`}>
          <div className="relative flex flex-col p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 ease-in-out">
            <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
            
            <div className="flex items-center gap-4">
              {hasChildren && (
                <button
                  onClick={() => toggleExpand(category.id)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  )}
                </button>
              )}
              
              <div className={`w-10 h-10 rounded-xl ${category.color} flex items-center justify-center text-white transform group-hover:scale-110 transition-transform duration-200 shadow-sm`}>
                <Icon className="w-5 h-5" />
              </div>

              {editingId === category.id ? (
                <div className="flex-1 space-y-3">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Category name"
                  />
                  <div className="flex gap-3">
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setEditedColor(color)}
                          className={`w-6 h-6 rounded-full ${color} transform hover:scale-110 transition-transform duration-200 ${editedColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                        />
                      ))}
                    </div>
                    <select
                      value={editedIcon}
                      onChange={(e) => setEditedIcon(e.target.value)}
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {commonIcons.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                    <select
                      value={editedParentId || ''}
                      onChange={(e) => setEditedParentId(e.target.value || undefined)}
                      className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">No Parent</option>
                      {getParentCategories()
                        .filter(c => c.id !== category.id)
                        .map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
              ) : (
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-900">{category.name}</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onDeleteCategory(category.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Budget Progress Bar */}
                  {budget > 0 && (
                    <div className="mt-4 space-y-2">
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${progressColor} transition-all duration-500`}
                          style={{ width: `${Math.min(percentageUsed, 100)}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">${totalSpent.toFixed(2)} spent</span>
                        {editingBudgetId === category.id ? (
                          <div className="flex items-center gap-2">
                            <div className="relative">
                              <DollarSign className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                              <input
                                type="number"
                                value={budgetInput}
                                onChange={(e) => setBudgetInput(e.target.value)}
                                className="pl-8 pr-2 py-1 border rounded-lg w-24 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Budget"
                                step="0.01"
                                min="0"
                              />
                            </div>
                            <button
                              onClick={() => handleBudgetSave(category)}
                              className="p-1 text-green-600 hover:text-green-700"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingBudgetId(null)}
                              className="p-1 text-red-600 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleBudgetEdit(category)}
                            className="font-medium hover:text-blue-600 transition-colors"
                          >
                            ${budget.toFixed(2)} budget
                          </button>
                        )}
                      </div>
                      {percentageUsed >= 85 && (
                        <div className="flex items-center gap-1 text-yellow-600 text-sm">
                          <AlertTriangle className="w-4 h-4" />
                          {percentageUsed >= 100 ? 'Over budget' : 'Approaching limit'}
                        </div>
                      )}
                    </div>
                  )}
                  {!budget && (
                    <button
                      onClick={() => handleBudgetEdit(category)}
                      className="mt-2 text-sm text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Set budget
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`overflow-hidden transition-all duration-200 ease-in-out ${isExpanded ? 'max-h-screen opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
          {getChildCategories(category.id).map(child => renderCategory(child, level + 1))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-900">
          <Tags className="w-8 h-8 text-blue-600" />
          Categories
        </h2>

        <div className="mb-10">
          <div className="bg-gray-50 rounded-xl p-6 space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">Add New Category</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Category name"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <select
                  value={newCategory.parentId || ''}
                  onChange={(e) => setNewCategory({ 
                    ...newCategory, 
                    parentId: e.target.value || undefined 
                  })}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">No Parent (Main Category)</option>
                  {getParentCategories().map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-200">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setNewCategory({ ...newCategory, color })}
                      className={`w-8 h-8 rounded-full ${color} transform hover:scale-110 transition-transform duration-200 ${newCategory.color === color ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                    />
                  ))}
                </div>
                <select
                  value={newCategory.icon}
                  onChange={(e) => setNewCategory({ ...newCategory, icon: e.target.value })}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {commonIcons.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
                <button
                  onClick={handleAddCategory}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 flex items-center gap-2 transform hover:translate-y-[-2px] transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  Add Category
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {getParentCategories().map(category => renderCategory(category))}
        </div>
      </div>
    </div>
  );
};