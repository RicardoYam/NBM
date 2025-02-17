import { View, ScrollView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFormik } from "formik";
import { router, useLocalSearchParams } from "expo-router";
import CreatePostStepOne from "@/screens/create-post-step-one";
import CreatePostStepTwo from "@/screens/create-post-step-two";
import CreatePostStepThree from "@/screens/create-post-step-three";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Category } from "@/types/feed";
import { createPost } from "@/services/feed";

const CreateNewPost = () => {
  const queryClient = useQueryClient();

  const categories: Category[] =
    (useQueryClient().getQueryData(["categories"]) as { data: Category[] })
      .data || [];

  const { step = "1" } = useLocalSearchParams();
  const currentStep = parseInt(Array.isArray(step) ? step[0] : step, 10);

  const createPostMutation = useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (values: {
      title: string;
      content: string;
      tags: string[];
    }) => {
      return await createPost(values);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push("/feed");
    },
    onError: (error) => {
      console.error("Failed to create post:", error);
    },
  });

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    tags: Yup.array().of(Yup.string()).min(1, "At least one tag is required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      tags: [],
    },
    validationSchema,
    validateOnBlur: true,
    onSubmit: (values) => {
      createPostMutation.mutate(values);
    },
  });
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" translucent />

      <View className="flex-1 px-4">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="w-full">
          <View className="flex-1">
            {currentStep === 1 && <CreatePostStepOne formik={formik} />}

            {currentStep === 2 && (
              <CreatePostStepTwo categories={categories} formik={formik} />
            )}

            {currentStep === 3 && (
              <CreatePostStepThree categories={categories} formik={formik} />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CreateNewPost;
