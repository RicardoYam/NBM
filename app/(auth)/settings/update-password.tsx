import { View, Text, ScrollView, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import PostCreateHeader from "@/components/post-create-header";
import Input from "@/components/input";

const UpdatePassword = () => {
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

            <Text className="font-syne font-bold text-[18px] text-charcoal pt-6 pb-4">
              Update Password
            </Text>

            <View className="flex flex-col">
              <View className="flex flex-col gap-2 mt-6">
                <Text className="font-syne font-bold text-[16px] text-charcoal">
                  Current Password
                </Text>
                <View className="flex flex-row gap-2 border border-secondary py-4 px-3">
                  <Input
                    label="Current Password"
                    placeholder="Enter your current password"
                    value="123"
                  />
                </View>
              </View>

              <View className="flex flex-col gap-2 mt-6">
                <Text className="font-syne font-bold text-[16px] text-charcoal">
                  Create a new Password
                </Text>
                <View className="flex flex-row gap-2 border border-secondary py-4 px-3">
                  <Input
                    label="Current Password"
                    placeholder="Enter your current password"
                    value="123"
                  />
                </View>
              </View>

              <View className="flex flex-col gap-2 mt-6">
                <Text className="font-syne font-bold text-[16px] text-charcoal">
                  Confirm New Password
                </Text>
                <View className="flex flex-row gap-2 border border-secondary py-4 px-3">
                  <Input
                    label="Current Password"
                    placeholder="Enter your current password"
                    value="123"
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UpdatePassword;
