'use client';
import { Eye, DollarSign, ShoppingCart, Users } from 'lucide-react';

interface AlCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  isDarkMode: boolean;
}

export const AlCard = ({ title, value, change, icon, isDarkMode }: AlCardProps) => {
  const bgColor = isDarkMode 
    ? 'bg-gradient-to-r from-cyan-400 to-cyan-500' 
    : 'bg-gradient-to-r from-pink-400 to-pink-500';

  return (
    <div className={`rounded-xl p-6 text-white cursor-pointer ${bgColor}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-90">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-sm mt-1">{change}</p>
        </div>
        {icon}
      </div>
    </div>
  );
};