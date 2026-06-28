import React from 'react';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Area, Line, ComposedChart } from 'recharts';
import { SwimmingSession } from '@/types';
import { formatDate, formatPace } from '@/lib/utils';

interface WeeklyPerformanceChartProps {
  sessions: SwimmingSession[];
}

export default function WeeklyPerformanceChart({ sessions }: WeeklyPerformanceChartProps) {
  // Take the last 7 sessions for the weekly display
  const recentSessions = [...sessions].slice(-7).map(session => {
    const dateObj = new Date(session.date);
    return {
      day: dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
      dateStr: formatDate(session.date),
      distance: session.distance,
      // Pace in mins/100m for visual representation on chart (e.g. 98s -> 1.63m)
      paceRaw: session.pace,
      paceMin: parseFloat((session.pace / 60).toFixed(2)),
      paceDisplay: formatPace(session.pace),
      swolf: session.swolf,
    };
  });

  return (
    <div className="glass-panel p-6 rounded-3xl w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">Training Volume & Pace</h3>
          <p className="text-xs text-gray-500 mt-0.5">Last 7 sessions performance trends</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan" />
            <span className="text-gray-400">Distance (m)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-brand-indigo" />
            <span className="text-gray-400">Pace (min/100m)</span>
          </div>
        </div>
      </div>

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={recentSessions} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="chartDistance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis 
              dataKey="day" 
              stroke="#64748B" 
              fontSize={11} 
              tickLine={false} 
              axisLine={false} 
            />
            {/* Left Y Axis for Distance */}
            <YAxis 
              yAxisId="left"
              stroke="#64748B" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={[0, 'auto']}
              label={{ value: 'Distance (meters)', angle: -90, position: 'insideLeft', style: { fill: '#64748B', fontSize: 10, fontWeight: 'bold' } }}
            />
            {/* Right Y Axis for Pace */}
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#64748B" 
              fontSize={11}
              tickLine={false}
              axisLine={false}
              domain={['auto', 'auto']}
              label={{ value: 'Pace (mins/100m)', angle: 90, position: 'insideRight', style: { fill: '#64748B', fontSize: 10, fontWeight: 'bold' } }}
            />
            <Tooltip 
              contentStyle={{ background: '#0F1626', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px' }}
              labelStyle={{ color: '#94A3B8', fontSize: '11px', fontWeight: 'bold' }}
              itemStyle={{ fontSize: '12px' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="chart-tooltip p-3 border border-white/5 rounded-xl text-left">
                      <p className="text-xs font-bold text-gray-400 mb-1.5">{data.dateStr}</p>
                      <div className="space-y-1">
                        <p className="text-xs text-white">
                          Distance: <span className="font-mono font-bold text-brand-cyan">{data.distance.toLocaleString()}m</span>
                        </p>
                        <p className="text-xs text-white">
                          Pace: <span className="font-mono font-bold text-brand-indigo">{data.paceDisplay}</span>
                        </p>
                        <p className="text-xs text-white">
                          SWOLF Efficiency: <span className="font-mono font-bold text-brand-emerald">{data.swolf}</span>
                        </p>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="distance" 
              stroke="#0EA5E9" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#chartDistance)" 
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="paceMin" 
              stroke="#6366F1" 
              strokeWidth={3}
              dot={{ stroke: '#6366F1', strokeWidth: 2, r: 4, fill: '#080C16' }}
              activeDot={{ r: 6, fill: '#6366F1' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
