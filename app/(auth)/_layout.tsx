import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      <Stack.Screen name="settings" options={{ headerShown: false }} />
      <Stack.Screen
        name="settings/personal-information"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="settings/location" options={{ headerShown: false }} />
      <Stack.Screen
        name="settings/update-password"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default AuthLayout;
