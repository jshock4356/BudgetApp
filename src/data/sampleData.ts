import { Transaction, Category, Card } from '../types';

export const categories: Category[] = [
  { 
    id: '1', 
    name: 'Housing', 
    color: 'bg-blue-500', 
    icon: 'Home',
    balance: 1500
  },
  { 
    id: '2', 
    name: 'Transportation', 
    color: 'bg-green-500', 
    icon: 'Car',
    balance: 350
  },
  { 
    id: '3', 
    name: 'Food', 
    color: 'bg-yellow-500', 
    icon: 'UtensilsCrossed',
    balance: 450,
  },
  { 
    id: '4', 
    name: 'Utilities', 
    color: 'bg-purple-500', 
    icon: 'Lightbulb',
    balance: 200
  },
  { 
    id: '5', 
    name: 'Entertainment', 
    color: 'bg-pink-500', 
    icon: 'Tv',
    balance: 150
  },
  {
    id: '6',
    name: 'Public Transport',
    color: 'bg-green-400',
    icon: 'Bus',
    parentId: '2',
    balance: 100
  },
  {
    id: '7',
    name: 'Car Expenses',
    color: 'bg-green-600',
    icon: 'Car',
    parentId: '2',
    balance: 250
  }
];

// Recurring monthly expenses for January 2025
const recurringExpenses: Transaction[] = [
  {
    id: 'rec1',
    amount: -1500,
    description: 'Monthly Rent',
    category: '1',
    date: '2025-01-01',
    isRecurring: true,
    recurringDay: 1,
  },
  {
    id: 'rec2',
    amount: -150,
    description: 'Electric Bill',
    category: '4',
    date: '2025-01-05',
    isRecurring: true,
    recurringDay: 5,
  },
  {
    id: 'rec3',
    amount: -89.99,
    description: 'Internet Service',
    category: '4',
    date: '2025-01-10',
    isRecurring: true,
    recurringDay: 10,
  },
  {
    id: 'rec4',
    amount: -65,
    description: 'Phone Bill',
    category: '4',
    date: '2025-01-15',
    isRecurring: true,
    recurringDay: 15,
  },
  {
    id: 'rec5',
    amount: -220,
    description: 'Car Insurance',
    category: '7',
    date: '2025-01-20',
    isRecurring: true,
    recurringDay: 20,
  },
  {
    id: 'rec6',
    amount: -55.99,
    description: 'Streaming Services',
    category: '5',
    date: '2025-01-02',
    isRecurring: true,
    recurringDay: 2,
  },
  {
    id: 'rec7',
    amount: -45,
    description: 'Gym Membership',
    category: '5',
    date: '2025-01-05',
    isRecurring: true,
    recurringDay: 5,
  }
];

// Regular transactions for January 2025
const regularTransactions: Transaction[] = [
  // Week 1
  {
    id: '1',
    amount: 3200,
    description: 'Monthly Salary',
    category: '1',
    date: '2025-01-01',
    isRecurring: false,
  },
  {
    id: '2',
    amount: -85.50,
    description: 'Grocery Shopping',
    category: '3',
    date: '2025-01-02',
    isRecurring: false,
  },
  {
    id: '3',
    amount: -35.99,
    description: 'Gas Station',
    category: '7',
    date: '2025-01-03',
    isRecurring: false,
  },
  // Week 2
  {
    id: '4',
    amount: -78.25,
    description: 'Restaurant Dinner',
    category: '3',
    date: '2025-01-08',
    isRecurring: false,
  },
  {
    id: '5',
    amount: 450,
    description: 'Freelance Work',
    category: '1',
    date: '2025-01-10',
    isRecurring: false,
  },
  {
    id: '6',
    amount: -92.45,
    description: 'Grocery Shopping',
    category: '3',
    date: '2025-01-12',
    isRecurring: false,
  },
  // Week 3
  {
    id: '7',
    amount: -42.50,
    description: 'Gas Station',
    category: '7',
    date: '2025-01-15',
    isRecurring: false,
  },
  {
    id: '8',
    amount: -65.99,
    description: 'New Clothes',
    category: '5',
    date: '2025-01-17',
    isRecurring: false,
  },
  {
    id: '9',
    amount: 300,
    description: 'Side Project Payment',
    category: '1',
    date: '2025-01-18',
    isRecurring: false,
  },
  // Week 4
  {
    id: '10',
    amount: -105.30,
    description: 'Grocery Shopping',
    category: '3',
    date: '2025-01-22',
    isRecurring: false,
  },
  {
    id: '11',
    amount: -75.00,
    description: 'Concert Tickets',
    category: '5',
    date: '2025-01-24',
    isRecurring: false,
  },
  {
    id: '12',
    amount: -38.25,
    description: 'Gas Station',
    category: '7',
    date: '2025-01-26',
    isRecurring: false,
  },
  // Week 5
  {
    id: '13',
    amount: -58.99,
    description: 'Restaurant Lunch',
    category: '3',
    date: '2025-01-29',
    isRecurring: false,
  },
  {
    id: '14',
    amount: -95.50,
    description: 'Grocery Shopping',
    category: '3',
    date: '2025-01-31',
    isRecurring: false,
  },
  {
    id: '15',
    amount: 200,
    description: 'Cash Back Rewards',
    category: '1',
    date: '2025-01-31',
    isRecurring: false,
  }
];

export const transactions: Transaction[] = [
  ...recurringExpenses,
  ...regularTransactions
];

export const cards: Card[] = [
  {
    id: '1',
    name: 'Chase Sapphire',
    lastFourDigits: '4321',
    balance: 2500.75,
    limit: 10000,
    type: 'credit',
  },
  {
    id: '2',
    name: 'Bank of America Checking',
    lastFourDigits: '8765',
    balance: 4320.50,
    type: 'debit',
  },
  {
    id: '3',
    name: 'American Express Gold',
    lastFourDigits: '9012',
    balance: 1750.25,
    limit: 15000,
    type: 'credit',
  },
];