import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import Ion from "react-native-vector-icons/Ionicons";
import FeedCard from "./feed-card";
import { Post } from "@/types/feed";

interface Props {
  post: Post;
}

const PostHeader = ({ post }: Props) => {
  return (
    <View className="flex flex-col bg-white px-7 pt-4">
      <View className="flex flex-row bg-white items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7}>
          <Ion name="arrow-back-sharp" size={24} color="#383939" />
        </TouchableOpacity>

        <View className="flex flex-row items-center justify-between absolute left-1/2 -translate-x-1/2">
          <Text className="font-bold font-syne text-[25px] text-charcoal">
            Post
          </Text>
        </View>
      </View>

      <FeedCard post={post} />
    </View>
  );
};

export default PostHeader;
