'use server';

import { createClient } from './server';
import { redirect } from 'next/navigation';

// LOGIN
export async function signIn(email: string, password: string) {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) return { error: error.message };
    redirect('/dashboard');
}

// SIGNUP
export async function signUp(
    email: string,
    password: string,
    fullName: string
) {
    const supabase = await createClient();
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { full_name: fullName },
        },
    });
    if (error) return { error: error.message };
    return { success: 'Check your email to confirm your account!' };
}

// RESET PASSWORD
export async function resetPassword(email: string) {
    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/update-password`,
    });
    if (error) return { error: error.message };
    return { success: 'Reset link sent!' };
}

// LOGOUT
export async function signOut() {
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect('/login');
}