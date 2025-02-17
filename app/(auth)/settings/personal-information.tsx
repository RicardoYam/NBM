import { View, Text, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import PostCreateHeader from "@/components/post-create-header";
import ImageUpload from "@/components/image-upload";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { User } from "@/types/user";

const PersonalInformation = () => {
  const queryClient = useQueryClient();
  const currentUser = queryClient
    .getMutationCache()
    .find({ mutationKey: ["signInUser"] })?.state.data as User;

  const [userInfo, setUserInfo] = useState({
    firstName: currentUser.user.firstName,
    lastName: currentUser.user.lastName,
    email: currentUser.user.email,
  });

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
              Personal Information
            </Text>

            <ImageUpload selectedImage="" />

            <View className="flex flex-col gap-2">
              <Text className="font-syne font-bold text-[16px] text-charcoal">
                Your name
              </Text>
              <View className="gap-1">
                <TextInput
                  className="border border-primary py-4 px-3 font-syne font-normal text-[16px]"
                  value={userInfo.firstName}
                  onChangeText={(text) =>
                    setUserInfo({ ...userInfo, firstName: text })
                  }
                />
                <TextInput
                  className="border border-primary py-4 px-3 font-syne font-normal text-[16px]"
                  value={userInfo.lastName}
                  onChangeText={(text) =>
                    setUserInfo({ ...userInfo, lastName: text })
                  }
                />
              </View>

              <Text className="font-syne font-bold text-[16px] text-charcoal">
                Email
              </Text>
              <View className="gap-1">
                <TextInput
                  className="border border-primary py-4 px-3 font-syne font-normal text-[16px]"
                  value={userInfo.email}
                  onChangeText={(text) =>
                    setUserInfo({ ...userInfo, email: text })
                  }
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PersonalInformation;
