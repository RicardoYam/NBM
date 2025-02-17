import { Stack } from "expo-router";

const FeedLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="feed" options={{ headerShown: false }} />
      <Stack.Screen name="feed/[id]" options={{ headerShown: false }} />
      <Stack.Screen
        name="feed/create-new-post"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default FeedLayout;
