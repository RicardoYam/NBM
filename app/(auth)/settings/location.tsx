import { View, Text, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import PostCreateHeader from "@/components/post-create-header";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";

const Location = () => {
  const queryClient = useQueryClient();

  const currentUser = queryClient
    .getMutationCache()
    .find({ mutationKey: ["signInUser"] })?.state.data as User;

  const [userLocation, setUserLocation] = useState<string>(
    currentUser.user.address
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" translucent />

      <View className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="w-full">
          <View className="flex flex-col flex-1 px-5">
            <PostCreateHeader
              label="Save"
              icon="checkmark"
              isDisabled={false}
            />

            <View>
              <Text className="font-syne font-bold text-[18px] text-charcoal pt-6 pb-4">
                Your address
              </Text>
              <TextInput
                className="border border-primary py-4 px-3 font-syne font-normal text-[16px]"
                value={userLocation}
                onChangeText={(text) => setUserLocation(text)}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Location;
