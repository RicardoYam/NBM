import { View, Text, TextInput } from "react-native";
import React from "react";
import PostCreateHeader from "@/components/post-create-header";
import { router } from "expo-router";

interface Props {
  formik: any;
}

const CreatePostStepOne = ({ formik }: Props) => {
  return (
    <View className="flex flex-col gap-[14px]">
      <PostCreateHeader
        label="Next"
        icon="arrow-forward-sharp"
        isDisabled={!formik.values.title || !formik.values.content}
        handleNextStep={() => {
          router.push("/feed/create-new-post?step=2");
        }}
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

export default CreatePostStepOne;
