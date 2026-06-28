import { StrokeType } from '../types';

export const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', iconName: 'LayoutDashboard' },
  { label: 'Performance', href: '/performance', iconName: 'Activity' },
  { label: 'Recovery', href: '/recovery', iconName: 'HeartPulse' },
  { label: 'AI Coach', href: '/ai-coach', iconName: 'Bot' },
  { label: 'Devices', href: '/devices', iconName: 'Cpu' },
  { label: 'History', href: '/history', iconName: 'History' },
  { label: 'Reports', href: '/reports', iconName: 'FileText' },
  { label: 'Settings', href: '/settings', iconName: 'Settings' },
];

export const ADMIN_NAV_ITEMS = [
  { label: 'Admin Dashboard', href: '/admin', iconName: 'ShieldAlert' },
];

export const STROKE_LABELS: Record<StrokeType, string> = {
  freestyle: 'Freestyle',
  backstroke: 'Backstroke',
  breaststroke: 'Breaststroke',
  butterfly: 'Butterfly',
  medley: 'Individual Medley',
};

export const STROKE_COLORS: Record<StrokeType, string> = {
  freestyle: '#0ea5e9', // Cyan
  backstroke: '#6366f1', // Indigo
  breaststroke: '#10b981', // Emerald
  butterfly: '#ec4899', // Pink
  medley: '#8b5cf6', // Violet
};

export const SCORE_LEVELS = {
  optimal: { min: 80, color: 'text-emerald-400', stroke: '#10b981', bg: 'bg-emerald-500/10', label: 'Optimal' },
  moderate: { min: 50, color: 'text-amber-400', stroke: '#f59e0b', bg: 'bg-amber-500/10', label: 'Moderate' },
  critical: { min: 0, color: 'text-rose-400', stroke: '#ef4444', bg: 'bg-rose-500/10', label: 'Rest Needed' },
};

export function getScoreLevel(score: number) {
  if (score >= SCORE_LEVELS.optimal.min) return SCORE_LEVELS.optimal;
  if (score >= SCORE_LEVELS.moderate.min) return SCORE_LEVELS.moderate;
  return SCORE_LEVELS.critical;
}
