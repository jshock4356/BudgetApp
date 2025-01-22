import React, { useState } from 'react';
import { Transaction } from '../types';
import { 
  Calendar as CalendarIcon, 
  RefreshCw, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Filter
} from 'lucide-react';

interface Props {
  transactions: Transaction[];
}

interface DayDetails {
  isVisible: boolean;
  day: number;
  transactions: Transaction[];
}

export const Calendar: React.FC<Props> = ({ transactions }) => {
  const [selectedDay, setSelectedDay] = useState<DayDetails>({
    isVisible: false,
    day: 0,
    transactions: [],
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showRecurring, setShowRecurring] = useState(true);
  const [showRegular, setShowRegular] = useState(true);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  // Get days from previous month for the calendar
  const daysInPrevMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    0
  ).getDate();
  const prevMonthDays = blanks.map((_, i) => daysInPrevMonth - blanks.length + i + 1);

  // Get days for next month
  const totalSlots = 42; // 6 rows * 7 days
  const nextMonthDays = Array.from(
    { length: totalSlots - (blanks.length + daysInMonth) },
    (_, i) => i + 1
  );

  const getTransactionsForDay = (day: number) => {
    return transactions.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate.getDate() === day &&
             transactionDate.getMonth() === currentMonth.getMonth() &&
             transactionDate.getFullYear() === currentMonth.getFullYear();
    }).filter(t => 
      (t.isRecurring && showRecurring) || (!t.isRecurring && showRegular)
    );
  };

  const getDailyTotal = (transactions: Transaction[]) => {
    return transactions.reduce((sum, t) => sum + t.amount, 0);
  };

  const getRecurringTransactions = (transactions: Transaction[]) => {
    return transactions.filter(t => t.isRecurring);
  };

  const getRegularTransactions = (transactions: Transaction[]) => {
    return transactions.filter(t => !t.isRecurring);
  };

  const handleDayClick = (day: number, dayTransactions: Transaction[]) => {
    setSelectedDay({
      isVisible: true,
      day,
      transactions: dayTransactions,
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handleMonthSelect = (monthIndex: number) => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(monthIndex);
      return newDate;
    });
  };

  const isCurrentDate = (day: number) => {
    const today = new Date();
    return day === today.getDate() &&
           currentMonth.getMonth() === today.getMonth() &&
           currentMonth.getFullYear() === today.getFullYear();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <CalendarIcon className="w-6 h-6" />
            <select
              value={currentMonth.getMonth()}
              onChange={(e) => handleMonthSelect(parseInt(e.target.value))}
              className="appearance-none bg-transparent font-bold text-2xl cursor-pointer hover:text-blue-600 focus:outline-none focus:text-blue-600"
              aria-label="Select month"
            >
              {months.map((month, index) => (
                <option key={month} value={index}>{month}</option>
              ))}
            </select>
            <span className="text-2xl font-bold">{currentMonth.getFullYear()}</span>
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-lg">
          <Filter className="w-4 h-4 text-gray-500" />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showRecurring}
              onChange={(e) => setShowRecurring(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            Recurring
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showRegular}
              onChange={(e) => setShowRegular(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500"
            />
            Regular
          </label>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-semibold text-gray-600 p-2">
            {day}
          </div>
        ))}

        {/* Previous month days */}
        {prevMonthDays.map(day => (
          <div
            key={`prev-${day}`}
            className="p-2 text-gray-400 border border-transparent"
          >
            <span className="text-sm">{day}</span>
          </div>
        ))}

        {/* Current month days */}
        {days.map((day) => {
          const dayTransactions = getTransactionsForDay(day);
          const hasTransactions = dayTransactions.length > 0;
          const totalAmount = getDailyTotal(dayTransactions);
          const recurringTransactions = getRecurringTransactions(dayTransactions);
          const regularTransactions = getRegularTransactions(dayTransactions);
          
          return (
            <div
              key={day}
              onClick={() => handleDayClick(day, dayTransactions)}
              className={`
                relative p-2 border rounded-lg cursor-pointer
                transition-all duration-200
                ${hasTransactions ? 'hover:shadow-md' : 'hover:bg-gray-50'}
                ${isCurrentDate(day) ? 'ring-2 ring-blue-500' : ''}
                ${totalAmount !== 0 ? 'border-gray-200' : 'border-gray-100'}
              `}
            >
              <div className="flex justify-between items-start mb-1">
                <span className={`
                  text-sm font-medium
                  ${isCurrentDate(day) ? 'text-blue-600' : 'text-gray-600'}
                `}>
                  {day}
                </span>
                {totalAmount !== 0 && (
                  <span
                    className={`
                      text-sm font-semibold px-2 py-0.5 rounded
                      ${totalAmount > 0 ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}
                    `}
                  >
                    ${Math.abs(totalAmount).toFixed(2)}
                  </span>
                )}
              </div>

              {recurringTransactions.length > 0 && showRecurring && (
                <div className="space-y-1 mt-1">
                  {recurringTransactions.map((t) => (
                    <div
                      key={t.id}
                      className="group relative"
                    >
                      <div
                        className="
                          flex items-center gap-1 text-xs font-medium
                          text-purple-700 bg-purple-50 rounded px-1.5 py-0.5
                        "
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span className="truncate">{t.description}</span>
                      </div>
                      
                      {/* Tooltip */}
                      <div className="
                        invisible group-hover:visible opacity-0 group-hover:opacity-100
                        absolute z-10 w-48 p-2 mt-1 text-sm bg-gray-900 text-white
                        rounded shadow-lg transition-all duration-200
                        -translate-y-2 group-hover:translate-y-0
                      ">
                        <p className="font-medium">{t.description}</p>
                        <p className="text-gray-300 mt-1">
                          ${Math.abs(t.amount).toFixed(2)}
                          {t.recurringDay && ` - Day ${t.recurringDay}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {regularTransactions.length > 0 && showRegular && (
                <div className="mt-1">
                  <div className="text-xs text-gray-500">
                    {regularTransactions.length} transaction{regularTransactions.length !== 1 ? 's' : ''}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Next month days */}
        {nextMonthDays.map(day => (
          <div
            key={`next-${day}`}
            className="p-2 text-gray-400 border border-transparent"
          >
            <span className="text-sm">{day}</span>
          </div>
        ))}
      </div>

      {/* Day Details Modal */}
      {selectedDay.isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {currentMonth.toLocaleString('default', { month: 'long' })} {selectedDay.day}
              </h3>
              <button
                onClick={() => setSelectedDay({ ...selectedDay, isVisible: false })}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {selectedDay.transactions.length > 0 ? (
              <div className="space-y-4">
                {getRecurringTransactions(selectedDay.transactions).length > 0 && showRecurring && (
                  <div>
                    <h4 className="font-medium text-purple-700 mb-2 flex items-center gap-1">
                      <RefreshCw className="w-4 h-4" />
                      Recurring Expenses
                    </h4>
                    <div className="space-y-2">
                      {getRecurringTransactions(selectedDay.transactions).map(t => (
                        <div
                          key={t.id}
                          className="flex justify-between items-center p-2 bg-purple-50 rounded"
                        >
                          <span className="font-medium">{t.description}</span>
                          <span className="text-purple-700">${Math.abs(t.amount).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {getRegularTransactions(selectedDay.transactions).length > 0 && showRegular && (
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Regular Transactions</h4>
                    <div className="space-y-2">
                      {getRegularTransactions(selectedDay.transactions).map(t => (
                        <div
                          key={t.id}
                          className="flex justify-between items-center p-2 bg-gray-50 rounded"
                        >
                          <span>{t.description}</span>
                          <span className={t.amount > 0 ? 'text-green-700' : 'text-red-700'}>
                            ${Math.abs(t.amount).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center font-bold">
                    <span>Daily Total</span>
                    <span className={getDailyTotal(selectedDay.transactions) > 0 ? 'text-green-700' : 'text-red-700'}>
                      ${Math.abs(getDailyTotal(selectedDay.transactions)).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No transactions for this day</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};