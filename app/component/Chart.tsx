'use client';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface ChartProps {
  data: any[];
  type: 'bar' | 'line';
  isDarkMode: boolean;
}

export const Chart = ({ data, type, isDarkMode }: ChartProps) => {
  const colors = {
    bar1: isDarkMode ? "#06B6D4" : "#14B8A6",
    bar2: isDarkMode ? "#64748B" : "#1F2937",
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      {type === 'bar' ? (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Bar dataKey="revenue" fill={colors.bar1} />
          <Bar dataKey="sales" fill={colors.bar2} />
        </BarChart>
      ) : (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Line type="monotone" dataKey="q1" stroke={colors.bar1} strokeWidth={3} />
          <Line type="monotone" dataKey="q2" stroke={colors.bar2} strokeWidth={3} />
        </LineChart>
      )}
    </ResponsiveContainer>
  );
};