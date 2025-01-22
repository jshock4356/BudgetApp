import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Transaction } from '../types';
import { Wallet } from 'lucide-react';

interface Props {
  transactions: Transaction[];
  month: Date;
}

interface EarningSource {
  name: string;
  value: number;
}

const COLORS = ['#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#f97316'];

export const EarningsChart: React.FC<Props> = ({ transactions, month }) => {
  const getEarningsBySource = (): EarningSource[] => {
    const earningsByDescription = new Map<string, number>();

    transactions.forEach(transaction => {
      if (transaction.amount > 0) { // Only consider earnings (positive amounts)
        const currentAmount = earningsByDescription.get(transaction.description) || 0;
        earningsByDescription.set(transaction.description, currentAmount + transaction.amount);
      }
    });

    return Array.from(earningsByDescription.entries())
      .map(([description, amount]) => ({
        name: description,
        value: amount
      }))
      .sort((a, b) => b.value - a.value);
  };

  const totalEarnings = transactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const data = getEarningsBySource();

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Wallet className="w-7 h-7 text-green-600" />
          Monthly Earnings
        </h2>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Earnings</p>
          <p className="text-2xl font-bold text-green-600">
            ${totalEarnings.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '0.5rem',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};