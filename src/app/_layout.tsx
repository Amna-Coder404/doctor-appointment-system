import { Stack } from "expo-router";
import {
  SafeAreaProvider
} from "react-native-safe-area-context";

import { LogBox } from "react-native";
import SafeAreaWrapper from "../components/SafeAreaWrapper";
import colors from "../lib/colors";

LogBox.ignoreLogs([
  "[Reanimated] Dependencies should only be used on the web",
]);

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

          <Stack.Screen name="auth/login" />
          <Stack.Screen name="booking/[doctorId]" />
          <Stack.Screen name="auth/complete-profile" />
        </Stack>
      </SafeAreaWrapper>
    </SafeAreaProvider>
  );
}