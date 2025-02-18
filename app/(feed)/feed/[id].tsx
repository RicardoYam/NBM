import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import PostHeader from "@/components/post-header";
import { useLocalSearchParams } from "expo-router";
import { Comment, Post } from "@/types/feed";
import PostComment from "@/components/post-comment";
import Ion from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPostComments, getPostComments } from "@/services/feed";
import { useCategoryStore } from "@/store/useCategoryStore";
import Loading from "@/components/loading";

const Id = () => {
  const [commentContent, setCommentContent] = useState<string>("");

  const { selectedCategories } = useCategoryStore((state) => state);

  const queryClient = useQueryClient();

  const { id } = useLocalSearchParams();
  const postId = Array.isArray(id) ? id[0] : id;

  const getPostCommentsQuery = useQuery({
    queryKey: ["postComments", id],
    queryFn: () => getPostComments({ id: Number(id), page: 1, limit: 10 }),
  });

  const postCommentMutation = useMutation({
    mutationKey: ["postComment"],
    mutationFn: () =>
      createPostComments({
        postId: Number(id),
        text: commentContent,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postComments", id] });
      setCommentContent("");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  if (getPostCommentsQuery.isLoading) {
    return <Loading />;
  }

  const posts: Post[] | undefined = queryClient
    .getQueryData<{ pages: { data: Post[] }[] }>(["posts", selectedCategories])
    ?.pages.flatMap((page) => page.data);

  const post: Post | undefined = posts?.find((post) => post.id === Number(id));

  const postComments: Comment[] = getPostCommentsQuery.data.data || [];

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView className="h-full">
        <View className="h-full w-full bg-secondary gap-2">
          {post && <PostHeader post={post} />}

          <View className="flex flex-col h-full bg-white px-7 py-4 gap-4">
            <Text className="font-syne font-bold text-[16px] text-charcoal">
              Comments
            </Text>

            {postComments.length > 0 ? (
              postComments.map((c) => <PostComment key={c.id} comment={c} />)
            ) : (
              <Text className="text-center text-charcoal py-8">
                No comments yet. Be the first to comment!
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Make a comment */}
      <View className="flex flex-row gap-2 items-center border-t border-charcoal pt-6 px-7">
        <TextInput
          value={commentContent}
          placeholder="Make a Comment"
          placeholderTextColor="#383939"
          style={{
            fontFamily: "Syne",
            fontSize: 14,
            fontWeight: "600",
          }}
          className="flex-1 bg-[#EFEFEF] px-4 py-2"
          onChangeText={(e) => setCommentContent(e)}
        />

        <TouchableOpacity
          className="bg-primary p-1"
          onPress={() => postCommentMutation.mutate()}
          disabled={!commentContent.trim()}
        >
          <Ion name="arrow-up-sharp" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Id;
