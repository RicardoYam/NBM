import { View, Text } from "react-native";
import React from "react";
import { router } from "expo-router";

interface Props {
  isSignIn: boolean;
}

const AuthFooter = ({ isSignIn }: Props) => {
  if (isSignIn) {
    return (
      <View className="flex flex-row gap-1 justify-center items-center">
        <Text className="font-syne font-normal text-[14px] text-primary">
          Don’t have an account?
        </Text>
        <View className="border-b border-primary">
          <Text
            className="font-syne font-semibold text-[14px] text-primary"
            onPress={() => router.push("/sign-up")}
          >
            Create one here.
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View className="flex flex-row gap-1 justify-center items-center">
        <Text className="font-syne font-normal text-[14px] text-primary">
          Already have an account?
        </Text>
        <View className="border-b border-primary">
          <Text
            className="font-syne font-semibold text-[14px] text-primary"
            onPress={() => router.push("/sign-in")}
          >
            Log in here.
          </Text>
        </View>
      </View>
    );
  }
};

export default AuthFooter;
