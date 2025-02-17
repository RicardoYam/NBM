import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import FeedHeader from "@/components/feed-header";
import FeedCard from "@/components/feed-card";
import { Post } from "@/types/feed";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories, getAllPosts } from "@/services/feed";
import { useCategoryStore } from "@/store/useCategoryStore";
import Loading from "@/components/loading";

const Feed = () => {
  const [searchContent, setSearchContent] = useState<string>("");
  const { selectedCategory, setSelectedCategory } = useCategoryStore(
    (state) => state
  );

  const getCategoryQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories({ page: 1, limit: 10 }),
  });

  const getPostsQuery = useQuery({
    queryKey: ["posts", selectedCategory],
    queryFn: () =>
      getAllPosts({
        page: 1,
        limit: 10,
        tags: selectedCategory ? [selectedCategory] : [],
      }),
    enabled: !!getCategoryQuery.data,
  });

  if (getCategoryQuery.isLoading || getPostsQuery.isLoading) {
    return <Loading />;
  }

  const categories = getCategoryQuery.data.data;
  const posts = getPostsQuery.data.data;

  const filteredPosts = posts.filter(
    (post: Post) =>
      post.title.toLowerCase().includes(searchContent.toLowerCase()) ||
      post.content.toLowerCase().includes(searchContent.toLowerCase())
  );

  const handleSelectedCategory = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView className="h-full">
        <View className="h-full w-full bg-secondary gap-2">
          <FeedHeader
            categories={categories}
            selectedCategory={selectedCategory}
            placeholder="Search"
            value={searchContent}
            handleChangeText={(e) => setSearchContent(e)}
            handleSelectedCategory={handleSelectedCategory}
          />

          {filteredPosts.length > 0 ? (
            filteredPosts.map((post: Post) => (
              <FeedCard
                key={post.id}
                post={post}
                numberOfLines={2}
                ellipsizeMode="tail"
                otherClassName="px-7"
              />
            ))
          ) : (
            <View className="bg-white items-center py-10">
              <Text className="text-lg">No posts found.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Feed;
