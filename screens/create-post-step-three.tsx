import { View, TextInput } from "react-native";
import React from "react";
import PostCreateHeader from "@/components/post-create-header";
import DropDown from "@/components/drop-down";
import { Category } from "@/types/feed";
import { useQueryClient } from "@tanstack/react-query";
import { useCategoryStore } from "@/store/useCategoryStore";

interface Props {
  formik: any;
  categories: Category[];
}

const CreatePostStepThree = ({ formik, categories }: Props) => {
  const { selectedCategories } = useCategoryStore((state) => state);
  const queryClient = useQueryClient();

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

  const handleSubmission = async () => {
    const error = await formik.validateForm();

    if (!error.title || !error.content || !error.tag) {
      formik.handleSubmit();
      queryClient.invalidateQueries({
        queryKey: ["posts", selectedCategories],
      });
    }
  };

  return (
    <View className="flex flex-col gap-[14px]">
      <PostCreateHeader
        label="Next"
        icon="arrow-forward-sharp"
        isDisabled={!formik.values.tags}
        handleNextStep={handleSubmission}
      />

      <DropDown
        categories={categories}
        selectedCategory={formik.values.tags}
        handleSelectedCategory={handleTagToggle}
      />

      <TextInput
        className="font-syne font-bold text-[25px]"
        placeholder="Enter post title..."
        placeholderTextColor="#38393988"
        value={formik.values.title}
        onChangeText={formik.handleChange("title")}
      />

      <TextInput
        className="font-syne font-normal text-[14px] h-full"
        placeholder="Enter post body text..."
        placeholderTextColor="#38393988"
        value={formik.values.content}
        onChangeText={formik.handleChange("content")}
        textAlignVertical="top"
        multiline
      />
    </View>
  );
};

export default CreatePostStepThree;
