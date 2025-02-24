import { Category } from "@/types/feed";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  category: Category;
  isActive: boolean;
  onCategorySelect?: (category: string) => void;
}

const FeedCategory = ({ category, isActive, onCategorySelect }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onCategorySelect && onCategorySelect(category.name)}
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
