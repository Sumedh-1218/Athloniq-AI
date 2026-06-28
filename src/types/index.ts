export interface User {
  id: string;
  name: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  age: number;
  weight: number; // in kg
  height: number; // in cm
}

export interface Device {
  id: string;
  deviceSerial: string;
  firmwareVersion: string;
  batteryStatus: number; // 0 to 100
  bleStatus: 'connected' | 'disconnected' | 'searching';
  lastSync: Date;
  sensorHealth: {
    max30102: 'healthy' | 'warning' | 'error';
    tmp117: 'healthy' | 'warning' | 'error';
    icm20948: 'healthy' | 'warning' | 'error';
  };
}

export type StrokeType = 'freestyle' | 'backstroke' | 'breaststroke' | 'butterfly' | 'medley';

export interface SwimmingSession {
  id: string;
  userId: string;
  date: Date;
  poolLength: number; // in meters, e.g., 25 or 50
  distance: number; // in meters
  duration: number; // in seconds (total active swim time)
  pace: number; // seconds per 100m
  swolf: number;
  strokes: number;
  strokeRate: number; // strokes per minute (SPM)
  strokeCount: number; // average strokes per lap
  lapCount: number;
  turnCount: number;
  turnEfficiency: number; // percentage (0-100) based on rotation velocity & glide index
  strokeEfficiency: number; // meters per stroke (0-10)
  avgHeartRate: number;
  maxHeartRate: number;
  hrv: number; // average HRV during session
  avgTemperature: number; // body temperature during session
  calories: number;
  primaryStroke: StrokeType;
}

export interface AIScores {
  date: Date;
  recoveryScore: number; // 0-100
  fatigueScore: number; // 0-100
  trainingReadiness: number; // 0-100
  performanceScore: number; // 0-100
  aiInsight: string;
}

export interface SensorDataPoint {
  timestamp: Date;
  heartRate: number;
  hrv: number;
  temperature: number;
  accX: number;
  accY: number;
  accZ: number;
  gyroX: number;
  gyroY: number;
  gyroZ: number;
}
