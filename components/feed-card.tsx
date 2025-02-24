import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Post } from "@/types/feed";
import Button from "./button";
import { router } from "expo-router";
import PostInfo from "./post-info";
import { icons } from "@/constants";
import { getDate } from "@/utils/util";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ion from "react-native-vector-icons/Ionicons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLikePosts } from "@/services/feed";
import { useCategoryStore } from "@/store/useCategoryStore";

interface Props {
  post: Post | undefined;
  numberOfLines?: number;
  ellipsizeMode?: "head" | "middle" | "tail" | "clip";
  otherClassName?: string;
}

const FeedCard = ({
  post,
  numberOfLines,
  ellipsizeMode,
  otherClassName,
}: Props) => {
  if (post === undefined) return null;
  const queryClient = useQueryClient();

  const { selectedCategories } = useCategoryStore();
  const [userId, setUserId] = useState<string | null>(null);

  const likePostMutation = useMutation({
    mutationKey: ["likePost", post.id],
    mutationFn: () => createLikePosts({ postId: post.id }),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ["posts", selectedCategories],
      });

      const previousPosts = queryClient.getQueryData([
        "posts",
        selectedCategories,
      ]);

      queryClient.setQueryData(
        ["posts", selectedCategories],
        (oldData: { pages: { data: Post[] }[] } | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              data: page.data.map((p) =>
                p.id === post.id ? { ...p, likes: p.likes + 1 } : p
              ),
            })),
          };
        }
      );

      return { previousPosts };
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", selectedCategories],
      });
    },
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      setUserId(storedUserId);
    };

    fetchUserId();
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => router.push(`/feed/${post.id}`)}
    >
      <View className={`bg-white pt-6 pb-2 ${otherClassName}`}>
        {/* Header */}
        <View className="flex flex-row justify-between">
          <PostInfo
            author={post.user.firstName + " " + post.user.lastName}
            date={getDate(post.createdAt)}
            authorId={post.user.id}
            postId={post.id}
            isComment={false}
          />

          {userId === post.user.id.toString() && (
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="font-syne font-base text-[14px] text-primary underline">
                Edit
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Content */}
        <View className="flex flex-col py-4 gap-4">
          <Text
            className="font-syne font-bold text-[25px] text-charcoal"
            numberOfLines={numberOfLines}
            ellipsizeMode={ellipsizeMode}
          >
            {post.title}
          </Text>

          <View className="flex flex-row gap-2">
            {post.tags.map((tag, index) => (
              <Button
                key={index}
                label={tag.name}
                isPrimary={true}
                containerClassName="self-start py-1 px-5"
              />
            ))}
          </View>

          <Text
            className="font-syne font-normal text-[14px] text-charcoal"
            numberOfLines={numberOfLines}
            ellipsizeMode={ellipsizeMode}
          >
            {post.content}
          </Text>

          <View className="flex flex-row gap-4 relative">
            <View className="flex flex-row gap-2 items-center text-center">
              <View className="mt-2">
                <icons.Comment />
              </View>
              <Text className="font-syne font-normal text-[14px] text-charcoal top-0.5">
                {post.comments}
              </Text>
            </View>

            <View className="flex flex-row gap-2 items-center text-center">
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  likePostMutation.mutate();
                }}
              >
                <View className="mt-2">
                  <Ion name="heart-outline" size={24} color="#000" />
                </View>
              </TouchableOpacity>
              <Text className="font-syne font-normal text-[14px] text-charcoal top-0.5">
                {post.likes}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeedCard;
