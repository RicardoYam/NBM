import { View, Image } from "react-native";
import React from "react";
import { images } from "@/constants";

const Loading = () => {
  return (
    <View className="flex flex-1 items-center justify-center bg-white">
      <Image
        source={images.LoadingLogo}
        className="w-[169px] h-[252px]"
        resizeMode="contain"
      />
    </View>
  );
};

export default Loading;
