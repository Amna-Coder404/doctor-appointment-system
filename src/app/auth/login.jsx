import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View
} from "react-native";
import useAuth from "../../hooks/useAuth";
import useNetworkStatus from "../../hooks/useNetworkStatus";
import colors from "../../lib/colors";
import styles from "../../styles/auth.style";

export default function LoginScreen() {
    const router = useRouter();
    const { signIn, signUp, resetPassword } = useAuth();

    const [isSignUp, setIsSignUp] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { isOnline } = useNetworkStatus();

    const handleSubmit = async () => {
        // 4. Check internet connection
        if (!isOnline) {
            Alert.alert(
                "You're offline",
                "Please connect to the internet and try again."
            );
            return;
        }
        // 1. Check required fields first
        if (!email.trim() || !password.trim()) {
            Alert.alert(
                "Missing information",
                "Please enter your email and password."
            );
            return;
        }

        // 2. Check full name for sign-up
        if (isSignUp && !fullName.trim()) {
            Alert.alert(
                "Missing information",
                "Please enter your full name."
            );
            return;
        }

        // 3. Validate password
        if (isSignUp && password.length < 6) {
            Alert.alert(
                "Weak password",
                "Your password must contain at least 6 characters."
            );
            return;
        }

        // 5. Perform authentication
        try {
            setLoading(true);

            const normalizedEmail = email.trim().toLowerCase();

            if (isSignUp) {
                const data = await signUp(
                    fullName.trim(),
                    normalizedEmail,
                    password
                );

                if (!data?.session) {
                    Alert.alert(
                        "Check your email",
                        "Your account has been created. Verify your email before signing in.",
                        [
                            {
                                text: "OK",
                                onPress: () => setIsSignUp(false),
                            },
                        ]
                    );
                    return;
                }

                Alert.alert("Success", "Your account has been created.");
                router.back();
                return;
            }

            await signIn(normalizedEmail, password);
            router.back();
        } catch (error) {
            Alert.alert(
                isSignUp ? "Sign-up failed" : "Login failed",
                error?.message || "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <LinearGradient
                    colors={[colors.primary, "#1E3A8A"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.header}
                >
                    <Pressable
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={22} color="#fff" />
                    </Pressable>

                    <View style={styles.logo}>
                        <Ionicons name="heart" size={34} color={colors.primary} />
                    </View>

                    <Text style={styles.title}>
                        {isSignUp ? "Create your account" : "Welcome to CareUp"}
                    </Text>

                    <Text style={styles.subtitle}>
                        {isSignUp
                            ? "Create an account to book and manage your appointments."
                            : "Sign in to book appointments and manage your visits."}
                    </Text>
                </LinearGradient>

                <View style={styles.card}>
                    {isSignUp && (
                        <>
                            <Text style={styles.label}>Full name</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons
                                    name="person-outline"
                                    size={20}
                                    color={colors.textSecondary}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter your full name"
                                    placeholderTextColor={colors.textSecondary}
                                    value={fullName}
                                    onChangeText={setFullName}
                                    autoCapitalize="words"
                                    editable={!loading}
                                />
                            </View>
                        </>
                    )}

                    <Text style={styles.label}>Email address</Text>
                    <View style={styles.inputWrapper}>
                        <Ionicons
                            name="mail-outline"
                            size={20}
                            color={colors.textSecondary}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="you@example.com"
                            placeholderTextColor={colors.textSecondary}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={!loading}
                        />
                    </View>

                    <Text style={styles.label}>Password</Text>
                    <View style={styles.inputWrapper}>
                        <Ionicons
                            name="lock-closed-outline"
                            size={20}
                            color={colors.textSecondary}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            placeholderTextColor={colors.textSecondary}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                            editable={!loading}
                        />
                        <Pressable
                            onPress={() => setShowPassword(!showPassword)}
                            hitSlop={10}
                        >
                            <Ionicons
                                name={showPassword ? "eye-off-outline" : "eye-outline"}
                                size={21}
                                color={colors.textSecondary}
                            />
                        </Pressable>
                    </View>

                    <Pressable
                        style={[styles.submitButton, loading && styles.disabledButton]}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <Text style={styles.submitText}>
                            {loading
                                ? "Please wait..."
                                : isSignUp
                                    ? "Create Account"
                                    : "Sign In"}
                        </Text>
                        {!loading && (
                            <Ionicons
                                name="arrow-forward"
                                size={20}
                                color={colors.textOnPrimary}
                            />
                        )}
                    </Pressable>

                    <View style={styles.switchRow}>
                        <Text style={styles.switchText}>
                            {isSignUp
                                ? "Already have an account? "
                                : "Don't have an account? "}
                        </Text>
                        <Pressable
                            onPress={() => setIsSignUp(!isSignUp)}
                            disabled={loading}
                        >
                            <Text style={styles.switchLink}>
                                {isSignUp ? "Sign in" : "Sign up"}
                            </Text>
                        </Pressable>
                    </View>

                    <Text style={styles.note}>
                        Your health journey starts with the right care.
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}