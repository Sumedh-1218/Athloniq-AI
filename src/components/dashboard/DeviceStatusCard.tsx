'use client';

import React from 'react';
import { mockDevice } from '@/lib/mock-data';
import { Cpu, Bluetooth, RefreshCw, Battery } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DeviceStatusCard() {
  const device = mockDevice;

  const sensorList = [
    { name: 'MAX30102 Heart Rate', status: device.sensorHealth.max30102 },
    { name: 'TMP117 Body Temp', status: device.sensorHealth.tmp117 },
    { name: 'ICM20948 9-Axis IMU', status: device.sensorHealth.icm20948 },
  ];

  return (
    <div className="glass-panel p-6 rounded-3xl w-full select-none flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan">
              <Cpu className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">Device Configuration</h3>
              <p className="text-[10px] text-gray-500 font-mono mt-0.5">{device.deviceSerial}</p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full px-2.5 py-0.5 text-[9px] font-extrabold uppercase text-brand-cyan">
            <Bluetooth className="w-3 h-3 text-brand-cyan animate-pulse" />
            <span>Connected</span>
          </div>
        </div>

        {/* Battery Capacity Status */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-400">Battery Level</span>
            <span className="text-xs font-extrabold font-mono text-white flex items-center gap-1.5">
              <Battery className="w-4 h-4 text-brand-emerald" />
              {device.batteryStatus}%
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${device.batteryStatus}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-brand-emerald to-emerald-400"
            />
          </div>
        </div>

        {/* Sensor Array Status */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
            Sensor Diagnostic Check
          </span>
          {sensorList.map((sensor) => (
            <div 
              key={sensor.name} 
              className="flex items-center justify-between p-2.5 bg-white/5 border border-white/5 rounded-xl text-xs"
            >
              <span className="text-gray-300 font-medium">{sensor.name}</span>
              <div className="flex items-center gap-1.5">
                {sensor.status === 'healthy' ? (
                  <>
                    <span className="text-brand-emerald font-bold text-[10px] uppercase tracking-wider">Active</span>
                    <span className="w-2 h-2 rounded-full bg-brand-emerald shadow-glow-emerald animate-pulse" />
                  </>
                ) : (
                  <>
                    <span className="text-brand-amber font-bold text-[10px] uppercase tracking-wider">Warning</span>
                    <span className="w-2 h-2 rounded-full bg-brand-amber animate-pulse" />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sync Footer */}
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
        <span className="flex items-center gap-1">
          <RefreshCw className="w-3.5 h-3.5 text-gray-500" />
          Last synced 3m ago
        </span>
        <span className="font-mono text-gray-500">{device.firmwareVersion}</span>
      </div>
    </div>
  );
}
