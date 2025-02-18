import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import FeedHeader from "@/components/feed-header";
import FeedCard from "@/components/feed-card";
import { Post } from "@/types/feed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAllCategories, getAllPosts } from "@/services/feed";
import { useCategoryStore } from "@/store/useCategoryStore";
import Loading from "@/components/loading";
import { PAGE_LIMIT, PAGE_NUMBER } from "@/constants/primitive";

const Feed = () => {
  const [searchContent, setSearchContent] = useState<string>("");
  const { selectedCategories, toggleCategory } = useCategoryStore();

  const getCategoryQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories({ page: PAGE_NUMBER, limit: PAGE_LIMIT }),
  });

  const getPostsQuery = useInfiniteQuery({
    queryKey: ["posts", selectedCategories],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getAllPosts({
        page: pageParam,
        limit: PAGE_LIMIT,
        tags: selectedCategories ?? [],
      }),
    getNextPageParam: (lastPage, allPages) => {
      const totalPosts = lastPage.total;
      const loadedPosts = allPages.flatMap((page) => page.data).length;

      return loadedPosts < totalPosts ? allPages.length + 1 : undefined;
    },
    enabled: !!getCategoryQuery.data,
  });

  if (getCategoryQuery.isLoading || getPostsQuery.isLoading) {
    return <Loading />;
  }

  const categories = getCategoryQuery.data?.data ?? [];
  const posts = getPostsQuery.data?.pages?.flatMap((page) => page.data) ?? [];

  const filteredPosts = posts.filter(
    (post: Post) =>
      post.title.toLowerCase().includes(searchContent.toLowerCase()) ||
      post.content.toLowerCase().includes(searchContent.toLowerCase())
  );

  const handleSelectedCategory = (category: string) => {
    toggleCategory(category);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="h-full w-full bg-secondary">
        <FeedHeader
          categories={categories}
          selectedCategories={selectedCategories}
          placeholder="Search"
          value={searchContent}
          handleChangeText={(e) => setSearchContent(e)}
          handleSelectedCategory={handleSelectedCategory}
        />

        <FlatList
          data={filteredPosts}
          keyExtractor={(post) => post.id.toString()}
          renderItem={({ item }) => (
            <FeedCard
              post={item}
              numberOfLines={2}
              ellipsizeMode="tail"
              otherClassName="px-7 mt-2"
            />
          )}
          onEndReached={() => {
            if (
              getPostsQuery.hasNextPage &&
              !getPostsQuery.isFetchingNextPage
            ) {
              getPostsQuery.fetchNextPage();
            }
          }}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={
            <View className="bg-white items-center py-10">
              <Text className="text-lg">No posts found.</Text>
            </View>
          }
          ListFooterComponent={
            getPostsQuery.isFetchingNextPage ? (
              <View className="py-4">
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Feed;
