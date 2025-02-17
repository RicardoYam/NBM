import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import Ion from "react-native-vector-icons/Ionicons";
import { icons } from "../constants";
import FeedCategory from "./feed-category";
import { Category } from "@/types/feed";
import { router } from "expo-router";

interface Props {
  categories: Category[];
  selectedCategory: string | null;
  value: string;
  placeholder: string;
  handleChangeText?: (e: string) => void;
  handleSelectedCategory?: (category: string) => void;
}

const FeedHeader = ({
  categories,
  selectedCategory,
  value,
  placeholder,
  handleChangeText,
  handleSelectedCategory,
}: Props) => {
  return (
    <View className="flex flex-col bg-white px-7">
      <View className="flex flex-row items-center justify-between py-8">
        <Text className="font-syne font-bold text-[25px] text-charcoal">
          Forum
        </Text>

        <View className="relative gap-4 flex flex-row items-center">
          <TouchableOpacity
            onPress={() => router.push("/feed/create-new-post")}
            activeOpacity={0.7}
          >
            <icons.Add />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/settings")}
            activeOpacity={0.7}
          >
            <icons.Account />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View className="w-full h-[40px] bg-secondary justify-center items-center flex flex-row px-4 gap-4">
        <Ion name="search" size={18} color="#A9A9A9" />
        <TextInput
          className="flex-1"
          placeholder={placeholder}
          value={value}
          onChangeText={handleChangeText}
        />
      </View>

      {/* Category */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex flex-row gap-2 py-6">
          {categories.map((category, index) => (
            <View key={index}>
              <FeedCategory
                category={category}
                isActive={selectedCategory === category.name ? true : false}
                handleSelectedCategory={handleSelectedCategory}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default FeedHeader;
