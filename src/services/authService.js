
import { supabase } from "../lib/supabase";

// Sign in or slogin
export async function signInWithEmail(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
    });

    if (error) throw error;
    return data;
}

// Sign up
export async function signUpWithEmail(fullName, email, password) {
    const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
            data: {
                full_name: fullName.trim(),
            },
        },
    });

    if (error) throw error;
    return data;
}

// SignOut
export const signOut = async () => {
    const { error } = await supabase.auth.signOut({
        scope: "local",
    });

    if (error) throw error;

    return { error: null };
};
// Reset Password
export async function resetPassword(email) {
    const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase()
    );

    if (error) throw error;
}


// Get Current User Sesssion 
export async function getCurrentSession() {
    const { data, error } = await supabase.auth.getSession();

    if (error) throw error;
    return data.session;
}
