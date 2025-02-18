import { View, TouchableOpacity } from "react-native";
import React from "react";
import Ion from "react-native-vector-icons/Ionicons";
import Button from "./button";
import { router } from "expo-router";

interface Props {
  label: string;
  icon: string;
  isDisabled: boolean;
  handleNextStep?: () => void;
}

const PostCreateHeader = ({
  label,
  icon,
  isDisabled,
  handleNextStep,
}: Props) => {
  return (
    <View className="flex flex-row justify-between items-center py-6">
      <TouchableOpacity onPress={() => router.back()}>
        <Ion name="close-sharp" size={24} />
      </TouchableOpacity>

      <Button
        label={label}
        icon={icon}
        isDisabled={isDisabled}
        isPrimary={true}
        containerClassName="py-2 px-4"
        handlePress={handleNextStep}
      />
    </View>
  );
};

export default PostCreateHeader;
