import { View, Text, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import PostCreateHeader from "@/components/post-create-header";
import { usePersonalInformationStore } from "@/store/usePersonalInformationStore";

const Location = () => {
  const { personalInformations, setPersonalInformations } =
    usePersonalInformationStore();

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
                value={personalInformations.address}
                onChangeText={(text) =>
                  setPersonalInformations({ address: text })
                }
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Location;
