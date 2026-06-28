import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// ShadCN required function
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// AthloniqAI helper functions
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatTime(date: Date | string): string {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatPace(secondsPer100m: number): string {
  const minutes = Math.floor(secondsPer100m / 60);
  const seconds = secondsPer100m % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}/100m`;
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export function formatShortDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function formatDistance(meters: number): string {
  if (meters >= 1000) return `${(meters / 1000).toFixed(1)}km`;
  return `${meters}m`;
}

export function getScoreColor(score: number): string {
  if (score >= 80) return "#22c55e";
  if (score >= 60) return "#6366f1";
  if (score >= 40) return "#f59e0b";
  return "#ef4444";
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Moderate";
  return "Poor";
}