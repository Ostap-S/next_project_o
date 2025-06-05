'use client';
import { useState } from 'react';
import { AlCard } from './component/AICard';
import { Chart } from './component/Chart';
import { weeklyData, yearlyData } from './lib/constants';
import { Eye, DollarSign, ShoppingCart, Users } from 'lucide-react';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}>
      <div className="p-6">
        {/* Картки */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <AlCard 
            title="Daily Visits" 
            value="8,652" 
            change="+2.97% Since last month" 
            icon={<Eye size={32} className="opacity-80" />} 
            isDarkMode={isDarkMode}
          />
          {/* Інші картки */}
        </div>

        {/* Графіки */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl p-6 shadow-sm bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Weekly Sales</h3>
            <Chart data={weeklyData} type="bar" isDarkMode={isDarkMode} />
          </div>
          
          <div className="rounded-xl p-6 shadow-sm bg-white dark:bg-gray-800">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Yearly Sales</h3>
            <Chart data={yearlyData} type="line" isDarkMode={isDarkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}