export interface Transaction {
  id: string;
  amount: number;
  description: string;
  category: string;
  date: string;
  isRecurring: boolean;
  recurringDay?: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  parentId?: string;
  balance?: number;
  budget?: number;
}

export interface Card {
  id: string;
  name: string;
  lastFourDigits: string;
  balance: number;
  limit?: number;
  type: 'credit' | 'debit';
}