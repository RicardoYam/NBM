import { View, Text } from "react-native";
import React from "react";
import PostCreateHeader from "@/components/post-create-header";
import { router } from "expo-router";
import Checkbox from "expo-checkbox";
import { Category } from "@/types/feed";
import { FormikProps } from "formik";
import { NEW_POST_INITIAL_VALUES } from "@/constants/initials";

interface Props {
  formik: FormikProps<typeof NEW_POST_INITIAL_VALUES>;
  categories: Category[];
}

const CreatePostStepTwo = ({ formik, categories }: Props) => {
  const selectedTags: string[] = formik.values.tags ?? [];

  const handleTagToggle = (tag: string) => {
    const currentTags: string[] = formik.values.tags ?? [];

    if (currentTags.includes(tag)) {
      formik.setFieldValue(
        "tags",
        currentTags.filter((t) => t !== tag)
      );
    } else {
      formik.setFieldValue("tags", [...currentTags, tag]);
    }
  };

  return (
    <View className="flex flex-col gap-[14px]">
      <PostCreateHeader
        label="Next"
        icon="arrow-forward-sharp"
        isDisabled={selectedTags.length === 0}
        handleNextStep={() => {
          router.push("/feed/create-new-post?step=3");
        }}
      />

      <Text className="font-syne font-bold text-[25px]">Select Tags</Text>
      <View className="gap-[14px]">
        {categories.map((category, index) => (
          <View key={index} className="flex flex-row items-center gap-2">
            <Checkbox
              style={{
                width: 18,
                height: 18,
                borderWidth: 2,
                borderColor: "#38393933",
              }}
              value={selectedTags.includes(category.name)}
              onValueChange={() => handleTagToggle(category.name)}
            />
            <Text className="font-syne font-normal text-[18px] text-[#38393966] flex-1">
              {category.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CreatePostStepTwo;
