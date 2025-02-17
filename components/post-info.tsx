import { View, Text } from "react-native";
import React from "react";

interface Props {
  author: string;
  date: string;
}

const PostInfo = ({ author, date }: Props) => {
  return (
    <View className="flex flex-row flex-1 gap-2 items-center">
      <Text className="font-syne font-bold text-[14px] text-charcoal">
        {author}
      </Text>
      <View className="w-1 h-1 bg-primary rounded-full" />
      <Text className="font-syne font-base text-[14px] text-charcoal">
        {date}
      </Text>
    </View>
  );
};

export default PostInfo;
