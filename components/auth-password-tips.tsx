import { View, Text } from "react-native";
import { icons } from "@/constants";

const AuthPasswordTips = () => {
  return (
    <View className="gap-2 bg-secondary rounded-xl p-[14px] mt-6">
      <Text className="font-syne font-normal text-[14px] text-[#656565]">
        Your password must...
      </Text>
      <View className="flex flex-row items-center gap-2">
        <icons.Counter width="20" height="20" />
        <Text className="font-syne font-normal text-[14px] flex-1 text-[#656565]">
          Include at least one number (eg. 1)
        </Text>
      </View>
      <View className="flex flex-row items-center gap-2">
        <icons.Hash width="20" height="20" />
        <Text className="font-syne font-normal text-[14px] flex-1 text-[#656565]">
          Include at least one symbol (eg. #)
        </Text>
      </View>
      <View className="flex flex-row items-center gap-2">
        <icons.Text width="20" height="20" />
        <Text className="font-syne font-normal text-[14px] flex-1 text-[#656565]">
          Include at least one upper and lowercase character
        </Text>
      </View>
    </View>
  );
};

export default AuthPasswordTips;
