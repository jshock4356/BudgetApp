import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Wallet, CreditCard, CalendarDays, RefreshCw, LayoutList, Tags } from 'lucide-react';

export const Layout: React.FC = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: Wallet },
    { name: 'Cards', href: '/cards', icon: CreditCard },
    { name: 'Transactions', href: '/transactions', icon: LayoutList },
    { name: 'Categories', href: '/categories', icon: Tags },
    { name: 'Calendar', href: '/calendar', icon: CalendarDays },
    { name: 'Recurring', href: '/recurring', icon: RefreshCw },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Wallet className="w-8 h-8 text-blue-600" />
              Budget Finance
            </h1>
            <nav className="flex space-x-4">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                      location.pathname === item.href
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};