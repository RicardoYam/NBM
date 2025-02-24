import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState, useCallback, useMemo } from "react";
import FeedHeader from "@/components/feed-header";
import FeedCard from "@/components/feed-card";
import { Post } from "@/types/feed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAllCategories, getAllPosts } from "@/services/feed";
import { useCategoryStore } from "@/store/useCategoryStore";
import { PAGE_LIMIT, PAGE_NUMBER } from "@/constants/primitive";

const renderEmptyComponent = () => {
  return (
    <View className="bg-white items-center py-10">
      <Text className="text-lg">No posts found.</Text>
    </View>
  );
};

const renderFooterComponent = () => {
  return (
    <View className="py-4">
      <ActivityIndicator size="large" color="#6537FF" />
    </View>
  );
};

const Feed = () => {
  const [searchContent, setSearchContent] = useState<string>("");
  const { selectedCategories, toggleCategory } = useCategoryStore();
  const [refreshing, setRefreshing] = useState(false);

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

  const categories = getCategoryQuery.data?.data ?? [];
  const posts = useMemo(
    () => getPostsQuery.data?.pages?.flatMap((page) => page.data) ?? [],
    [getPostsQuery.data]
  );

  const filteredPosts = posts.filter(
    (post: Post) =>
      post.title.toLowerCase().includes(searchContent.toLowerCase()) ||
      post.content.toLowerCase().includes(searchContent.toLowerCase())
  );

  const handleSelectedCategory = (category: string) => {
    toggleCategory(category);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getPostsQuery.refetch();
    setRefreshing(false);
  }, [getPostsQuery]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="h-full w-full bg-secondary">
        <FeedHeader
          categories={categories}
          selectedCategories={selectedCategories}
          placeholder="Search"
          value={searchContent}
          handleChangeText={(e) => setSearchContent(e)}
          onCategorySelect={handleSelectedCategory}
        />

        {getPostsQuery.isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#6537FF" />
          </View>
        ) : (
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
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#0000ff"]}
              />
            }
            ListEmptyComponent={renderEmptyComponent}
            ListFooterComponent={
              getPostsQuery.isFetchingNextPage ? renderFooterComponent : null
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Feed;
