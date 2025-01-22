import React, { useState } from 'react';
import { Categories } from './Categories';
import { categories as initialCategories } from '../data/sampleData';
import { Category } from '../types';

export const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const handleAddCategory = (newCategory: Omit<Category, 'id'>) => {
    const id = Math.max(...categories.map(c => parseInt(c.id))) + 1;
    setCategories([...categories, { ...newCategory, id: id.toString() }]);
  };

  const handleUpdateCategory = (updatedCategory: Category) => {
    setCategories(categories.map(category =>
      category.id === updatedCategory.id ? updatedCategory : category
    ));
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  return (
    <Categories
      categories={categories}
      onAddCategory={handleAddCategory}
      onUpdateCategory={handleUpdateCategory}
      onDeleteCategory={handleDeleteCategory}
    />
  );
};