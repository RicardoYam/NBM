import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

interface Props {
  selectedImage?: string;
  pickImageAsync?: () => Promise<void>;
}

const ImageUpload = ({ selectedImage, pickImageAsync }: Props) => {
  return (
    <View className="flex flex-row items-center gap-6 mt-8">
      <Image
        className="w-[183px] h-[183px] rounded-full"
        source={{ uri: `data:image/jpeg;base64,${selectedImage}` }}
        resizeMode="cover"
      />
      <TouchableOpacity onPress={pickImageAsync} activeOpacity={0.7}>
        <Text className="underline underline-offset-1 font-medium text-[14px] font-syne text-primary">
          Edit profile picture
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ImageUpload;
