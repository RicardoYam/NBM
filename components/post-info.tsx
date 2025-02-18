import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  authorId: number;
  author: string;
  date: string;
}

const PostInfo = ({ authorId, author, date }: Props) => {
  const [currentUserId, setCurrentUserId] = React.useState<number | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const userId = await AsyncStorage.getItem("userId");
      setCurrentUserId(userId ? parseInt(userId, 10) : null);
    };

    fetchUserId();
  }, []);

  return (
    <View className="flex flex-row flex-1">
      <View className="flex flex-row flex-1 gap-2 items-center">
        <Text className="font-syne font-bold text-[14px] text-charcoal">
          {author}
        </Text>
        <View className="w-1 h-1 bg-primary rounded-full" />
        <Text className="font-syne font-base text-[14px] text-charcoal">
          {date}
        </Text>
      </View>

      {authorId === currentUserId && (
        <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
          <Text className="font-syne font-normal text-[14px] text-primary underline">
            Delete
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PostInfo;
