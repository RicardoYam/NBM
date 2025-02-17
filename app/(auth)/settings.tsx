import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import SettingsHeader from "@/components/settings-header";
import { LEGALS, SETTINGS } from "@/constants/arrays";
import Ion from "react-native-vector-icons/Ionicons";
import { icons } from "@/constants";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Settings = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" translucent />

      <View className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="w-full">
          <View className="flex flex-col flex-1 px-5">
            <SettingsHeader />

            {/* Settings */}
            <Text className="font-syne font-bold text-[18px] text-charcoal pt-12 pb-4">
              Settings
            </Text>
            {SETTINGS.map((setting, index) => {
              const IconComponent = icons[
                setting.icon as keyof typeof icons
              ] as React.FC<any>;

              return (
                <TouchableOpacity
                  key={index}
                  className="flex flex-row items-center justify-between bg-secondary my-2 py-6 px-4"
                  activeOpacity={0.7}
                  onPress={() => {
                    router.push(setting.route as any);
                  }}
                >
                  <View className="flex flex-row items-center gap-3">
                    {IconComponent && <IconComponent width={24} height={24} />}
                    <Text className="font-syne font-semibold text-[16px] text-charcoal">
                      {setting.title}
                    </Text>
                  </View>
                  <Ion name="chevron-forward" size={24} color="#38393966" />
                </TouchableOpacity>
              );
            })}

            {/* Sign Out */}
            <TouchableOpacity
              className="flex flex-row items-center justify-between bg-secondary my-2 py-6 px-4"
              activeOpacity={0.7}
              onPress={() => {
                AsyncStorage.clear();
                router.push("/");
              }}
            >
              <View className="flex flex-row items-center gap-3">
                <Ion name="log-out" size={28} color="#6537FF" />
                <Text className="font-syne font-semibold text-[16px] text-charcoal">
                  Log out
                </Text>
              </View>
              <Ion name="chevron-forward" size={24} color="#38393966" />
            </TouchableOpacity>

            {/* Legal */}
            <Text className="font-syne font-bold text-[18px] text-charcoal pt-12 pb-4">
              Legal
            </Text>
            {LEGALS.map((legal, index) => {
              const IconComponent = icons[
                legal.icon as keyof typeof icons
              ] as React.FC<any>;

              return (
                <TouchableOpacity
                  key={index}
                  className="flex flex-row items-center justify-between bg-secondary my-2 py-6 px-4"
                  activeOpacity={0.7}
                  onPress={() => {
                    router.push(legal.route as any);
                  }}
                >
                  <View className="flex flex-row items-center gap-3">
                    {IconComponent && <IconComponent width={24} height={24} />}
                    <Text className="font-syne font-semibold text-[16px] text-charcoal">
                      {legal.title}
                    </Text>
                  </View>
                  <Ion name="chevron-forward" size={24} color="#38393966" />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Settings;
