import { View, Text } from "react-native";
import React from "react";

interface Props {
  isActive: boolean;
}

const AuthStepIndicator = ({ isActive }: Props) => {
  return (
    <View
      className={`w-[70px] h-[8px] ${isActive ? "bg-primary" : "bg-secondary"}`}
    ></View>
  );
};

export default AuthStepIndicator;
