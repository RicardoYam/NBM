import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useQuery } from "@tanstack/react-query";
import { getTermsOfService } from "@/services/auth";
import Loading from "@/components/loading";
import { Terms } from "@/types/legal";
import Ion from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";

const TermsOfService = () => {
  const TermsOfServiceQuery = useQuery<Terms>({
    queryKey: ["terms-of-service"],
    queryFn: () => getTermsOfService(),
  });

  if (TermsOfServiceQuery.isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" translucent />

      <View className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="w-full">
          <View className="px-5">
            <View className="flex flex-col bg-white pt-8">
              <View className="flex flex-row bg-white items-center justify-between">
                <TouchableOpacity
                  onPress={() => router.back()}
                  activeOpacity={0.7}
                >
                  <Ion name="arrow-back-sharp" size={24} color="#383939" />
                </TouchableOpacity>

                <View className="flex flex-row items-center justify-between absolute left-1/2 -translate-x-1/2">
                  <Text className="font-bold font-syne text-[25px] text-charcoal">
                    Terms of Service
                  </Text>
                </View>
              </View>
            </View>

            <View className="flex flex-col flex-1 mt-12">
              <Text className="font-syne font-normal text-[14px] text-charcoal">
                {TermsOfServiceQuery.data?.description}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TermsOfService;
