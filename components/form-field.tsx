import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Input from "./input";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  handleChangeText?: (e: string) => void;
}

const FormField = ({
  label,
  placeholder,
  value,
  handleChangeText,
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View className="gap-[10px]">
      <Text className="font-syne font-bold text-[16px]">{label}</Text>
      <View className="flex flex-row items-center justify-between w-full border border-outlet px-3 py-4">
        <Input
          label={label}
          placeholder={placeholder}
          value={value}
          showPassword={showPassword}
          handleChangeText={handleChangeText}
          handleShowPassword={() => setShowPassword(!showPassword)}
          {...props}
        />
      </View>
    </View>
  );
};

export default FormField;
