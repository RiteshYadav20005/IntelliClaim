import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';

type ShapWaterfallProps = {
  features: { feature: string; contribution: number; effect: string }[];
};

export default function ShapWaterfall({ features }: ShapWaterfallProps) {
  const data = features.map(item => ({
    name: item.feature,
    value: item.contribution,
    isPositive: item.contribution > 0
  }));

  return (
    <div className="w-full h-80 relative min-h-[300px]">
      <div className="absolute inset-0">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
        >
          <XAxis type="number" hide />
          <YAxis 
            dataKey="name" 
            type="category" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#546E7A", fontSize: 12 }}
            width={120}
          />
          <Tooltip 
            cursor={{ fill: '#F0F4FF' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 16px rgba(13,71,161,0.1)' }}
            formatter={(val: number) => [`${val > 0 ? '+' : ''}${val.toFixed(3)}`, 'Contribution']}
          />
          <ReferenceLine x={0} stroke="#0A2540" strokeWidth={2} />
          <Bar dataKey="value" barSize={20} radius={[2, 2, 2, 2]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.isPositive ? "#B71C1C" : "#0D47A1"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
}
