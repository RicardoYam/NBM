import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostComments } from "@/services/feed";
import { useLocalSearchParams } from "expo-router";
import { useCategoryStore } from "@/store/useCategoryStore";

interface Props {
  authorId: number;
  author: string;
  postId: number;
  commentId?: number;
  date: string;
  isComment?: boolean;
}

const PostInfo = ({
  authorId,
  author,
  postId,
  commentId,
  date,
  isComment,
}: Props) => {
  const queryClient = useQueryClient();
  const { id } = useLocalSearchParams();
  const currentPostId = Array.isArray(id) ? id[0] : id;

  const { selectedCategories } = useCategoryStore((state) => state);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const deleteCommentMutation = useMutation({
    mutationKey: ["deleteComment", postId, commentId],
    mutationFn: () => deletePostComments({ postId, commentId: commentId ?? 0 }),
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
        (oldData: any) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page: any) => ({
              ...page,
              data: page.data.map((post: any) =>
                post.id === postId
                  ? { ...post, comments: post.comments - 1 }
                  : post
              ),
            })),
          };
        }
      );

      return { previousPosts };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["postComments", currentPostId],
      });
      queryClient.invalidateQueries({
        queryKey: ["posts", selectedCategories],
      });
    },
  });

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

      {authorId === currentUserId && isComment && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            deleteCommentMutation.mutate();
          }}
        >
          <Text className="font-syne font-normal text-[14px] text-primary underline">
            Delete
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PostInfo;
