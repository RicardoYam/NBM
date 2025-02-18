import { Image, Text, View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { StatusBar } from "expo-status-bar";
import Button from "@/components/button";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");

        if (token) {
          router.replace("/feed");
        }
      } catch (error) {
        console.error("Error checking token:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView className="h-full bg-primary flex justify-center items-center">
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-full bg-primary">
      <StatusBar style="light" translucent />

      <View className="h-full w-full">
        {/* Logo */}
        <View className="w-full h-1/2 flex justify-center items-center">
          <Image
            source={images.WelcomeLogo}
            className="w-[160px] h-[252px]"
            resizeMode="contain"
          />
        </View>

        {/* Introduction */}
        <View className="w-full h-full bg-white px-6 py-14 justify-start items-center gap-8">
          {/* Text */}
          <View className="gap-[16px]">
            <View className="gap-1">
              <Text className="font-[700] text-2xl text-intro font-syne">
                Welcome to
              </Text>
              <Text className="font-[700] text-2xl text-intro font-syne">
                the NBM Forum
              </Text>
            </View>
            <Text className="font-[400] text-base text-intro font-syne">
              Time to get all the answers you need in a forum made for designers
              and developers!
            </Text>
          </View>

          {/* Button */}
          <View className="relative w-full gap-2">
            <Button
              label="Create an Account"
              icon="arrow-forward-sharp"
              isPrimary={true}
              containerClassName="py-[16px] px-[14px]"
              handlePress={() =>
                router.push({ pathname: "/sign-up", params: { step: 1 } })
              }
            />
            <Button
              label="Sign In"
              icon="arrow-forward-sharp"
              isPrimary={false}
              containerClassName="py-[16px] px-[14px]"
              handlePress={() => router.push("/sign-in")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
