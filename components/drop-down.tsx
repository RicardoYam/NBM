import { Category } from "@/types/feed";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ion from "react-native-vector-icons/Ionicons";

interface Props {
  categories: Category[];
  selectedCategory: string[];
  handleSelectedCategory: (value: string) => void;
}

const DropDown = ({
  categories,
  selectedCategory,
  handleSelectedCategory,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <View className="flex flex-col relative">
      <TouchableOpacity
        className="flex flex-row items-center gap-2 bg-primary px-5 py-3 self-start"
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <Text className="font-syne font-normal text-[14px] text-[#fff]">
          {selectedCategory.join(", ")}
        </Text>
        <Ion name="caret-down" size={14} color="#fff" />
      </TouchableOpacity>

      {isOpen && (
        <View className="absolute top-14 bg-white border border-charcoal self-start z-10">
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              className="flex flex-row items-center gap-2 pl-5 pr-14 py-3 self-start"
              onPress={() => {
                handleSelectedCategory(category.name);
                setIsOpen(false);
              }}
              activeOpacity={0.7}
            >
              <Text className="font-syne font-normal text-[14px] text-charcoal">
                {category.name}
              </Text>
              {selectedCategory.includes(category.name) && (
                <Ion
                  name="checkmark"
                  size={14}
                  color="#000"
                  className="gap-2"
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default DropDown;
