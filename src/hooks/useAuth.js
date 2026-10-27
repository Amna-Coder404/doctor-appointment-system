
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import {
    getCurrentSession,
    signInWithEmail,
    signOut,
    signUpWithEmail,
} from "../services/authService";

export default function useAuth() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const { data: { subscription }, } = supabase.auth.onAuthStateChange((_event, newSession) => {
            if (mounted) {
                setSession(newSession);
                setLoading(false);
            }
        });

        async function restoreSession() {
            try {
                const currentSession = await getCurrentSession();

                if (mounted) {
                    setSession(currentSession);
                }
            } catch (error) {
                console.error("Session restore error:", error.message);
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        }

        restoreSession();

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    return {
        session,
        user: session?.user ?? null,
        loading,
        signIn: signInWithEmail,
        signUp: signUpWithEmail,
        signOut,

    };
}
