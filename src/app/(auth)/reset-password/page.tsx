'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Waves, ArrowLeft } from 'lucide-react';
import { resetPassword } from '@/lib/supabase/auth-actions';

export default function ResetPasswordPage() {
    const [isDark, setIsDark] = useState(true);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const result = await resetPassword(email);
        if (result?.error) {
            setError(result.error);
            setLoading(false);
        } else {
            setSent(true);
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
            {/* LEFT PANEL */}
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
                        Don't worry.<br />
                        We've got<br />
                        <span className="text-cyan-400">your back.</span>
                    </h2>
                    <p className="text-blue-200 text-lg leading-relaxed">
                        Reset your password and get back to tracking your performance in seconds.
                    </p>
                    <div className="mt-10 p-6 rounded-2xl"
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                        <p className="text-cyan-400 font-semibold mb-2">🔒 Secure Reset</p>
                        <p className="text-blue-200 text-sm">
                            We'll send a secure link to your email. The link expires in 1 hour for your safety.
                        </p>
                    </div>
                </div>

                <div className="relative z-10">
                    <p className="text-blue-300 text-sm italic">
                        "Security is just as important as performance."
                    </p>
                </div>
            </div>

            {/* RIGHT PANEL */}
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
                    {!sent ? (
                        <>
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-1"
                                    style={{ color: isDark ? '#ffffff' : '#1e3a6e' }}>
                                    Reset Password 🔑
                                </h2>
                                <p className="text-sm" style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                                    Enter your email and we'll send you a reset link
                                </p>
                            </div>

                            {error && (
                                <div className="mb-4 p-3 rounded-xl text-sm"
                                    style={{
                                        background: 'rgba(239,68,68,0.1)',
                                        border: '1px solid rgba(239,68,68,0.3)',
                                        color: '#ef4444',
                                    }}>
                                    ⚠️ {error}
                                </div>
                            )}

                            <form onSubmit={handleReset} className="space-y-5">
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

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all duration-300 hover:opacity-90 hover:scale-[1.02] disabled:opacity-50"
                                    style={{
                                        background: 'linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%)',
                                        boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
                                    }}
                                >
                                    {loading ? 'Sending...' : 'Send Reset Link →'}
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            <div className="text-6xl mb-4">📧</div>
                            <h2 className="text-2xl font-bold mb-2"
                                style={{ color: isDark ? '#ffffff' : '#1e3a6e' }}>
                                Check your email!
                            </h2>
                            <p className="text-sm mb-6"
                                style={{ color: isDark ? '#94a3b8' : '#64748b' }}>
                                We sent a reset link to{' '}
                                <span className="text-cyan-400">{email}</span>.
                                It expires in 1 hour.
                            </p>
                            <div className="p-4 rounded-xl mb-6"
                                style={{
                                    background: 'rgba(14,165,233,0.1)',
                                    border: '1px solid rgba(14,165,233,0.2)',
                                }}>
                                <p className="text-cyan-400 text-sm">
                                    Didn't receive it? Check your spam folder or try again.
                                </p>
                            </div>
                            <button
                                onClick={() => setSent(false)}
                                className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
                            >
                                Try different email
                            </button>
                        </div>
                    )}

                    <div className="mt-6 pt-6"
                        style={{
                            borderTop: isDark
                                ? '1px solid rgba(255,255,255,0.1)'
                                : '1px solid rgba(0,0,0,0.1)'
                        }}>
                        <Link
                            href="/login"
                            className="flex items-center justify-center gap-2 text-sm transition-colors hover:text-cyan-300"
                            style={{ color: isDark ? '#64748b' : '#94a3b8' }}
                        >
                            <ArrowLeft size={16} />
                            Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}