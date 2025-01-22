import React, { useState } from 'react';
import { cards as initialCards } from '../data/sampleData';
import { CreditCard, Wallet, Trash } from 'lucide-react';

export const Cards: React.FC = () => {
  // State to manage the cards
  const [cards, setCards] = useState(initialCards);

  // Calculate total balance
  const totalBalance = cards.reduce((sum, card) => sum + card.balance, 0);

  // Handler to add a new card
  const addCard = () => {
    const newCard = {
      id: cards.length + 1, // Unique ID
      name: `Card ${cards.length + 1}`, // Example card name
      type: 'credit', // Default type
      lastFourDigits: Math.floor(1000 + Math.random() * 9000), // Random 4 digits
      balance: 0, // Default balance
      limit: 1000, // Example credit limit
    };
    setCards([...cards, newCard]);
  };

  // Handler to delete a card by ID
  const deleteCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Add Card Button */}
      <div className="mb-4">
        <button
          onClick={addCard}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700"
        >
          Add Card
        </button>
      </div>

      {/* Total Balance Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Wallet className="w-6 h-6" />
          Total Balance
        </h2>
        <p className="text-4xl font-bold text-blue-600">
          ${totalBalance.toFixed(2)}
        </p>
      </div>

      {/* Cards Display Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <CreditCard
                className={`w-8 h-8 ${
                  card.type === 'credit' ? 'text-purple-500' : 'text-green-500'
                }`}
              />
              <span className="text-sm font-medium text-gray-500">
                ****{card.lastFourDigits}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{card.name}</h3>
            <p className="text-2xl font-bold text-gray-900 mb-2">
              ${card.balance.toFixed(2)}
            </p>
            {card.limit && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Credit Used</span>
                  <span>{((card.balance / card.limit) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 rounded-full h-2"
                    style={{ width: `${(card.balance / card.limit) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Limit: ${card.limit.toFixed(2)}
                </p>
              </div>
            )}
            {/* Delete Button */}
            <button
              onClick={() => deleteCard(card.id)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 flex items-center gap-2"
            >
              <Trash className="w-4 h-4" />
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
