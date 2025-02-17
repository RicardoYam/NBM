import { View, Text } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  message: string;
  otherClass?: string;
}

const AuthError = ({ message, otherClass }: Props) => {
  return (
    <View
      className={`flex flex-row gap-2 h-auto bg-warning rounded-[10px] w-full ${otherClass}`}
    >
      <Icon name="alert-circle-outline" size={32} color="#FF0000" />
      <Text className="font-syne font-normal text-[14px] text-charcoal flex-1">
        {message}
      </Text>
    </View>
  );
};

export default AuthError;
