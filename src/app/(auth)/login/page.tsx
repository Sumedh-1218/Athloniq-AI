'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, Waves } from 'lucide-react';
import { signIn } from '@/lib/supabase/auth-actions';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [isDark, setIsDark] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const result = await signIn(email, password);
        if (result?.error) {
            setError(result.error);
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-screen w-full flex transition-colors duration-500"
            style={{
                background: isDark
                    ? 'linear-gradient(135deg, #080C16 0%, #0D1B35 50%, #080C16 100%)'
                    : 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #EFF6FF 100%)',
            }}
        >
            {/* LEFT PANEL — Branding */}
            <div
                className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden"
                style={{
                    background: isDark
                        ? 'linear-gradient(160deg, #0D1B35 0%, #1E3A6E 100%)'
                        : 'linear-gradient(160deg, #1E40AF 0%, #3B82F6 100%)',
                }}
            >
                <div className="absolute inset-0 overflow-hidden">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full border opacity-10"
                            style={{
                                width: `${300 + i * 150}px`,
                                height: `${300 + i * 150}px`,
                                bottom: `-${100 + i * 50}px`,
                                left: `-${50 + i * 30}px`,
                                borderColor: '#0EA5E9',
                                animation: `pulse ${3 + i}s ease-in-out infinite`,
                            }}
                        />
                    ))}
                </div>

                <div className="relative z-10 flex items-center gap-3">
                    <Image src="/logo.png" alt="AthloniqAI Logo" width={48} height={48} className="rounded-xl" />
                    <div>
                        <h1 className="text-white font-bold text-xl tracking-tight">AthloniqAI</h1>
                        <p className="text-blue-300 text-xs">Swimming Intelligence</p>
                    </div>
                </div>

                <div className="relative z-10">
                    <Waves className="text-cyan-400 mb-6" size={32} />
                    <h2 className="text-white text-4xl font-bold leading-tight mb-4">
                        Train Smarter.<br />
                        Swim Faster.<br />
                        <span className="text-cyan-400">Recover Better.</span>
                    </h2>
                    <p className="text-blue-200 text-lg leading-relaxed">
                        AI-powered insights from your wearable — real-time biometrics,
                        performance analytics, and personalized coaching.
                    </p>
                    <div className="flex gap-8 mt-10">
                        {[
                            { value: '98%', label: 'Accuracy' },
                            { value: '2ms', label: 'Latency' },
                            { value: '24/7', label: 'Monitoring' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p className="text-cyan-400 text-2xl font-bold">{stat.value}</p>
                                <p className="text-blue-300 text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10">
                    <p className="text-blue-300 text-sm italic">
                        "The difference between a good swimmer and a great one is data."
                    </p>
                </div>
            </div>

            {/* RIGHT PANEL — Login Form */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">

                <div className="absolute top-6 right-6">
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                        style={{
                            background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                            color: isDark ? '#ffffff' : '#1e3a6e',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        {isDark ? '☀️ Light' : '🌙 Dark'}
                    </button>
                </div>

                <div className="lg:hidden flex items-center gap-3 mb-8">
                    <Image src="/logo.png" alt="AthloniqAI" width={40} height={40} className="rounded-xl" />
                    <span className="font-bold text-xl" style={{ color: isDark ? '#ffffff' : '#1e3a6e' }}>
                        AthloniqAI
                    </span>
                </div>

                <div
                    className="w-full max-w-md rounded-2xl p-8 transition-all duration-500"
                    style={{
                        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(20px)',
                        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                        boxShadow: isDark ? '0 25px 50px rgba(0,0,0,0.5)' : '0 25px 50px rgba(0,0,0,0.1)',
                    }}
                >
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-1" style={{ color: isDark ? '#ffffff' : '#1e3a6e' }}>
                            Welcome back 👋
                        </h2>
                        <p className="text-sm" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                            Sign in to your AthloniqAI account
                        </p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div
                            className="mb-4 p-3 rounded-xl text-sm"
                            style={{
                                background: 'rgba(239,68,68,0.1)',
                                border: '1px solid rgba(239,68,68,0.3)',
                                color: '#ef4444',
                            }}
                        >
                            ⚠️ {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium mb-2"
                                style={{ color: isDark ? '#94a3b8' : '#475569' }}>
                                Email address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2" size={16}
                                    style={{ color: isDark ? '#64748b' : '#94a3b8' }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="athlete@example.com"
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                                    style={{
                                        background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)',
                                        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                                        color: isDark ? '#ffffff' : '#1e3a6e',
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2"
                                style={{ color: isDark ? '#94a3b8' : '#475569' }}>
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2" size={16}
                                    style={{ color: isDark ? '#64748b' : '#94a3b8' }} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    className="w-full pl-10 pr-12 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                                    style={{
                                        background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)',
                                        border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                                        color: isDark ? '#ffffff' : '#1e3a6e',
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                    style={{ color: isDark ? '#64748b' : '#94a3b8' }}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Link href="/reset-password" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                            style={{
                                background: 'linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)',
                                boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
                            }}
                        >
                            {loading ? 'Signing in...' : 'Sign In →'}
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-px"
                                style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
                            <span className="text-xs" style={{ color: isDark ? '#475569' : '#94a3b8' }}>
                                or continue with
                            </span>
                            <div className="flex-1 h-px"
                                style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
                        </div>

                        <button
                            type="button"
                            className="w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02]"
                            style={{
                                background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)',
                                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                                color: isDark ? '#ffffff' : '#1e3a6e',
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18">
                                <path fill="#4285F4" d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18z" />
                                <path fill="#34A853" d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17z" />
                                <path fill="#FBBC05" d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18z" />
                                <path fill="#EA4335" d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.77 4.77 0 0 1 4.48-3.3z" />
                            </svg>
                            Continue with Google
                        </button>
                    </form>

                    <p className="text-center text-sm mt-6" style={{ color: isDark ? '#64748b' : '#94a3b8' }}>
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                            Sign up free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}