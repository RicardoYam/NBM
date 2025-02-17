import { Category } from "@/types/feed";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  category: Category;
  isActive: boolean;
  handleSelectedCategory?: (category: string) => void;
}

const FeedCategory = ({
  category,
  isActive,
  handleSelectedCategory,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() =>
        handleSelectedCategory && handleSelectedCategory(category.name)
      }
    >
      <Text
        className={`font-syne font-base text-[14px] py-1 px-4 ${isActive ? "text-white bg-primary" : "text-charcoal bg-[#38393911]"}`}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
};

export default FeedCategory;
