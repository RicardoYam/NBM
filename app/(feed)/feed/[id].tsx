import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import PostHeader from "@/components/post-header";
import { useLocalSearchParams } from "expo-router";
import { Comment, Post } from "@/types/feed";
import PostComment from "@/components/post-comment";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPostComments, getPostComments } from "@/services/feed";
import { useCategoryStore } from "@/store/useCategoryStore";
import Loading from "@/components/loading";
import PostMakeComment from "@/components/post-make-comment";
import { COMMENT_PAGE_LIMIT, COMMENT_PAGE_NUMBER } from "@/constants/primitive";

const Id = () => {
  const queryClient = useQueryClient();

  const [commentContent, setCommentContent] = useState<string>("");
  const { selectedCategories } = useCategoryStore((state) => state);

  const { id } = useLocalSearchParams();

  const getPostCommentsQuery = useQuery({
    queryKey: ["postComments", id],
    queryFn: () =>
      getPostComments({
        id: Number(id),
        page: COMMENT_PAGE_NUMBER,
        limit: COMMENT_PAGE_LIMIT,
      }),
  });

  const postCommentMutation = useMutation({
    mutationKey: ["postComment"],
    mutationFn: () =>
      createPostComments({
        postId: Number(id),
        text: commentContent,
      }),
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
              data: page.data.map((post) =>
                post.id === Number(id)
                  ? { ...post, comments: post.comments + 1 }
                  : post
              ),
            })),
          };
        }
      );

      return { previousPosts };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postComments", id] });
      queryClient.invalidateQueries({
        queryKey: ["posts", selectedCategories],
      });

      setCommentContent("");
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

  const handleCommentChange = (text: string) => {
    setCommentContent(text);
  };

  const handleCommentSubmit = () => {
    postCommentMutation.mutate();
  };

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
      <PostMakeComment
        commentContent={commentContent}
        handleTextChange={handleCommentChange}
        handleCommentSubmit={handleCommentSubmit}
      />
    </SafeAreaView>
  );
};

export default Id;
