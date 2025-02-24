import { View, Text, ScrollView, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import PostCreateHeader from "@/components/post-create-header";
import ImageUpload from "@/components/image-upload";
import { usePersonalInformationStore } from "@/store/usePersonalInformationStore";

const PersonalInformation = () => {
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
                  value={personalInformations.firstName}
                  onChangeText={(firstName) =>
                    setPersonalInformations({ firstName })
                  }
                />
                <TextInput
                  className="border border-primary py-4 px-3 font-syne font-normal text-[16px]"
                  value={personalInformations.lastName}
                  onChangeText={(lastName) =>
                    setPersonalInformations({ lastName })
                  }
                />
              </View>

              <Text className="font-syne font-bold text-[16px] text-charcoal">
                Email
              </Text>
              <View className="gap-1">
                <TextInput
                  className="border border-primary py-4 px-3 font-syne font-normal text-[16px]"
                  value={personalInformations.email}
                  onChangeText={(email) => setPersonalInformations({ email })}
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
