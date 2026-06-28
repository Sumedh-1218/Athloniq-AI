import { User, Device, SwimmingSession, AIScores, SensorDataPoint } from '../types';

export const mockUser: User = {
  id: 'usr_123',
  name: 'Alex Mercer',
  email: 'alex.mercer@athloniq.ai',
  gender: 'male',
  age: 26,
  weight: 78,
  height: 184,
};

export const mockDevice: Device = {
  id: 'dev_sw_909',
  deviceSerial: 'AQ-ESP32C6-88F4A',
  firmwareVersion: 'v2.1.8',
  batteryStatus: 85,
  bleStatus: 'connected',
  lastSync: new Date(Date.now() - 1000 * 60 * 3), // 3 min ago
  sensorHealth: {
    max30102: 'healthy',
    tmp117: 'healthy',
    icm20948: 'healthy',
  },
};

const COCHING_INSIGHTS = [
  "Your recovery is optimal (88/100). HRV is up 14% from baseline. This is an excellent day for a high-intensity lactate threshold session. Target a pace of 1:35/100m for your main set.",
  "Noticeable fatigue accumulation detected today (Score: 72/100). Swolf efficiency was slightly lower in yesterday's PM set. Keep today's session in the aerobic zone (Z2), focusing on catch technique and glide phases.",
  "Your body temperature showed a minor elevation trend (+0.4°C) overnight, combined with a dip in HRV. This indicates mild system stress or overreaching. Consider an active recovery session or a rest day.",
  "Excellent consistency! Your turn efficiency improved by 8% over the last week. The gyroscope data shows faster rotational velocity. Try adding 2-3 dolphin kicks off the wall to maximize glide phase speed.",
  "Your stroke efficiency is peak today. Swolf of 38 is your best this month. Keep your distance per stroke (DPS) long. A sprint focus set of 50m intervals is recommended to test speed retention.",
  "Slight fatigue from high training load. Let's focus on technical drill work today. Focus on your hand entry and catch under the body. Avoid max effort sets to let your nervous system recover.",
];

// Generate 30 days of historical data
export function generateMockData() {
  const sessions: SwimmingSession[] = [];
  const aiScores: AIScores[] = [];
  const today = new Date();
  
  // Base parameters that trend or fluctuate
  const baseHrv = 68;
  const basePerformance = 75;
  const baseFatigue = 40;
  const baseRecovery = 70;
  
  for (let i = 30; i >= 0; i--) {
    const currentDate = new Date();
    currentDate.setDate(today.getDate() - i);
    currentDate.setHours(8, 0, 0, 0); // Morning readings
    
    // Create daily fluctuations
    const hrvNoise = Math.sin(i * 0.5) * 8 + (Math.random() - 0.5) * 4;
    const tempNoise = Math.sin(i * 0.3) * 0.2 + (Math.random() - 0.5) * 0.1;
    const dailyHrv = Math.round(baseHrv + hrvNoise);
    const dailyTemp = parseFloat((36.5 + tempNoise).toFixed(1));
    
    // AI Scores calculation
    // High HRV + Low Temp = High Recovery
    let recovery = Math.round(baseRecovery + (hrvNoise * 1.5) - (tempNoise * 15) + (Math.random() - 0.5) * 5);
    recovery = Math.max(15, Math.min(99, recovery));
    
    let fatigue = Math.round(baseFatigue - (hrvNoise * 0.8) + (Math.random() - 0.5) * 8);
    // If there was a session the day before, fatigue goes up
    if (sessions.length > 0 && sessions[sessions.length - 1].date.getDate() === currentDate.getDate() - 1) {
      fatigue += 15;
    }
    fatigue = Math.max(10, Math.min(95, fatigue));
    
    let readiness = Math.round((recovery * 0.6) + ((100 - fatigue) * 0.4) + (Math.random() - 0.5) * 4);
    readiness = Math.max(15, Math.min(99, readiness));
    
    let performance = Math.round(basePerformance + (readiness - 70) * 0.3 + (Math.random() - 0.5) * 5);
    performance = Math.max(40, Math.min(98, performance));
    
    const insightIndex = Math.abs(Math.round(Math.sin(i) * 5)) % COCHING_INSIGHTS.length;
    
    aiScores.push({
      date: new Date(currentDate),
      recoveryScore: recovery,
      fatigueScore: fatigue,
      trainingReadiness: readiness,
      performanceScore: performance,
      aiInsight: COCHING_INSIGHTS[insightIndex],
    });
    
    // Determine if user swam on this day (approx. 5 days a week)
    const dayOfWeek = currentDate.getDay();
    const didSwim = dayOfWeek !== 1 && dayOfWeek !== 5; // Rest on Mon/Fri
    
    if (didSwim) {
      const isEvening = Math.random() > 0.6;
      const sessionDate = new Date(currentDate);
      sessionDate.setHours(isEvening ? 18 : 7, 30, 0, 0);
      
      // Swimming Session Metrics
      const poolLength = Math.random() > 0.7 ? 50 : 25;
      const laps = poolLength === 25 ? Math.round(60 + Math.random() * 80) : Math.round(30 + Math.random() * 40);
      const distance = laps * poolLength;
      
      // Speed / Pace calculations (secs per 100m)
      // Elite: 75-90s, Competitive: 90-110s, Fit: 110-130s
      const paceBase = 92 + (100 - readiness) * 0.2; // Pace degrades if readiness is low
      const paceNoise = (Math.random() - 0.5) * 6;
      const pace = Math.round(paceBase + paceNoise);
      
      const duration = Math.round((distance / 100) * pace);
      
      // Swolf calculation (Lap Time + Stroke Count per lap)
      // e.g. 25m pool: 22s lap time + 14 strokes = 36 Swolf. 50m pool: 45s + 32 strokes = 77 Swolf
      const lapTime = pace * (poolLength / 100);
      const strokesPerLap = poolLength === 25 ? Math.round(13 + Math.random() * 4) : Math.round(28 + Math.random() * 6);
      const swolf = Math.round(lapTime + strokesPerLap);
      
      const strokes = strokesPerLap * laps;
      const strokeRate = Math.round((strokes / duration) * 60); // Strokes per min
      const strokeEfficiency = parseFloat((poolLength / strokesPerLap).toFixed(2)); // meters per stroke
      
      // Heart rates
      const avgHeartRate = Math.round(138 + (pace - 100) * 0.5 + (Math.random() - 0.5) * 8);
      const maxHeartRate = Math.round(avgHeartRate + 25 + (Math.random() * 8));
      
      // Turns & efficiency
      const turnCount = laps - 1;
      const turnEfficiency = Math.round(75 + (readiness * 0.1) + (Math.random() - 0.5) * 10);
      
      // Primary stroke distribution
      const strokeRoll = Math.random();
      let primaryStroke: SwimmingSession['primaryStroke'] = 'freestyle';
      if (strokeRoll > 0.9) primaryStroke = 'butterfly';
      else if (strokeRoll > 0.8) primaryStroke = 'breaststroke';
      else if (strokeRoll > 0.65) primaryStroke = 'backstroke';
      else if (strokeRoll > 0.55) primaryStroke = 'medley';
      
      sessions.push({
        id: `sess_${i}_${didSwim ? '1' : '2'}`,
        userId: 'usr_123',
        date: sessionDate,
        poolLength,
        distance,
        duration,
        pace,
        swolf,
        strokes,
        strokeRate,
        strokeCount: strokesPerLap,
        lapCount: laps,
        turnCount,
        turnEfficiency,
        strokeEfficiency,
        avgHeartRate,
        maxHeartRate,
        hrv: Math.round(dailyHrv * 0.95), // HRV drops slightly during/after workout
        avgTemperature: dailyTemp,
        calories: Math.round(duration * 0.22),
        primaryStroke,
      });
    }
  }
  
  return { sessions, aiScores };
}

export const { sessions: mockSessions, aiScores: mockAIScores } = generateMockData();

// Get recent workout metrics
export const recentWorkout: SwimmingSession = mockSessions[mockSessions.length - 1];

// Get today's AI score
export const todayAIScores: AIScores = mockAIScores[mockAIScores.length - 1];

// HR Zone breakdown for recent workout
export interface HeartRateZone {
  name: string;
  value: number;
  color: string;
  minHr: number;
  maxHr: number;
  description: string;
}

export const getHeartRateZones = (session: SwimmingSession): HeartRateZone[] => {
  const maxHr = session.maxHeartRate;
  
  // Calculate based on classic Formula:
  // Zone 5 (90-100%): Active Sprint
  // Zone 4 (80-90%): Threshold
  // Zone 3 (70-80%): Aerobic / Tempo
  // Zone 2 (60-70%): Endurance / Base
  // Zone 1 (50-60%): Warmup / Recovery
  return [
    { name: 'Z5 Active Sprint', value: 12, color: '#ef4444', minHr: Math.round(maxHr * 0.9), maxHr, description: 'Anaerobic capacity & speed' },
    { name: 'Z4 Lactate Threshold', value: 35, color: '#f97316', minHr: Math.round(maxHr * 0.8), maxHr: Math.round(maxHr * 0.9) - 1, description: 'Lactate threshold & pacing' },
    { name: 'Z3 Aerobic / Tempo', value: 28, color: '#eab308', minHr: Math.round(maxHr * 0.7), maxHr: Math.round(maxHr * 0.8) - 1, description: 'Aerobic fitness & efficiency' },
    { name: 'Z2 Endurance', value: 15, color: '#10b981', minHr: Math.round(maxHr * 0.6), maxHr: Math.round(maxHr * 0.7) - 1, description: 'Base endurance & fat burning' },
    { name: 'Z1 Warmup / Recovery', value: 10, color: '#0ea5e9', minHr: Math.round(maxHr * 0.5), maxHr: Math.round(maxHr * 0.6) - 1, description: 'Active recovery & drills' },
  ];
};

// Playback Telemetry Generator (Category 1 Direct Sensor Data)
export function generateTelemetryPlayback(session: SwimmingSession): SensorDataPoint[] {
  const dataPoints: SensorDataPoint[] = [];
  const durationSec = session.duration;
  const numPoints = 120; // Generate 120 samples across the session
  const step = Math.floor(durationSec / numPoints);
  
  const startTime = new Date(session.date);
  
  for (let i = 0; i < numPoints; i++) {
    const timestamp = new Date(startTime.getTime() + i * step * 1000);
    
    // Heart rate curve (starts low, ramps up, oscillates with intervals)
    let hr = session.avgHeartRate;
    const progress = i / numPoints;
    const intervalFactor = Math.sin(progress * Math.PI * 8) * 15; // 4 main swim sets
    if (progress < 0.1) {
      hr = 90 + (session.avgHeartRate - 90) * (progress / 0.1) + intervalFactor;
    } else {
      hr = session.avgHeartRate + intervalFactor + (Math.random() - 0.5) * 6;
    }
    hr = Math.round(Math.max(80, Math.min(session.maxHeartRate, hr)));
    
    // HRV - inversely proportional to HR
    const hrv = Math.round(session.hrv + (140 - hr) * 0.4 + (Math.random() - 0.5) * 5);
    
    // Temperature - slowly rises and stabilizes
    const temperature = parseFloat((session.avgTemperature + Math.min(0.8, progress * 0.9) + (Math.random() - 0.5) * 0.05).toFixed(2));
    
    // Acceleration and gyroscope signals (oscillatory due to stroke patterns)
    const strokeProgress = i % 10; // strokes are periodic
    const accX = Math.sin(strokeProgress * 0.6) * 1.5;
    const accY = Math.cos(strokeProgress * 0.6) * 1.8;
    const accZ = Math.sin(strokeProgress * 1.2) * 0.8;
    
    const gyroX = Math.cos(strokeProgress * 0.6) * 120;
    const gyroY = Math.sin(strokeProgress * 0.6) * 140;
    const gyroZ = Math.cos(strokeProgress * 1.2) * 90;
    
    dataPoints.push({
      timestamp,
      heartRate: hr,
      hrv,
      temperature,
      accX,
      accY,
      accZ,
      gyroX,
      gyroY,
      gyroZ,
    });
  }
  
  return dataPoints;
}
