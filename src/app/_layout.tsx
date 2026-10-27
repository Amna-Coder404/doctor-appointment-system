import { Stack } from "expo-router";
import {
  SafeAreaProvider
} from "react-native-safe-area-context";

import SafeAreaWrapper from "../components/SafeAreaWrapper";
import colors from "../lib/colors";


export default function RootLayout() {
  return (
    <SafeAreaProvider>

      <SafeAreaWrapper>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: colors.background,
            },
          }}
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="doctor/[id]" />
          <Stack.Screen name="booking-confirmation" />
          <Stack.Screen name="auth/login" />
          <Stack.Screen name="booking/[doctorId]" />
          <Stack.Screen name="auth/complete-profile" />
        </Stack>
      </SafeAreaWrapper>
    </SafeAreaProvider>
  );
}