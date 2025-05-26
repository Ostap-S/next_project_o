'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const data = [
  { name: 'January', sales: 4000 },
  { name: 'February', sales: 3000 },
  { name: 'March', sales: 2000 },
  { name: 'April', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'June', sales: 2390 },
];

export default function Chart() {
  return (
    <div className="w-full h-[400px]">
      <h2 className="text-center mb-4 text-xl font-semibold">Sales in First Half of Year</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            interval={0} 
            angle={-45} 
            textAnchor="end"
            height={60}
          >
            <Label value="Months" offset={-10} position="insideBottom" />
          </XAxis>
          <YAxis>
            <Label value="Amount, UAH" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip 
            formatter={(value) => [`${value} UAH`, 'Sales']}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={() => <span className="text-gray-700">Sales</span>}
          />
          <Bar 
            dataKey="sales" 
            name="Sales"
            fill="#4f46e5" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}