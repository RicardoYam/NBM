import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import PostCreateHeader from "@/components/post-create-header";
import Input from "@/components/input";
import { useFormik } from "formik";
import AuthError from "@/components/auth-error";
import { VALIDATIONSCHEMA_UPDATE_PASSWORD } from "@/constants/schema";
import { UPDATE_PASSWORD_INITIAL_VALUES } from "@/constants/initials";

const UpdatePassword = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: UPDATE_PASSWORD_INITIAL_VALUES,
    validationSchema: VALIDATIONSCHEMA_UPDATE_PASSWORD,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: (values) => {
      setErrorMessage(null);
    },
  });

  const handleSubmit = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      setErrorMessage(Object.values(errors)[0]);
    } else {
      setErrorMessage(null);
      formik.handleSubmit();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" translucent />

      <View className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="w-full">
          <View className="flex flex-col flex-1 px-5">
            {/* Header */}
            <PostCreateHeader
              label="Save"
              icon="checkmark"
              isDisabled={false}
              handleNextStep={handleSubmit}
            />

            <Text className="font-syne font-bold text-[18px] text-charcoal pt-6 pb-4">
              Update Password
            </Text>

            <View className="flex flex-col">
              {/* Current Password */}
              <View className="flex flex-col gap-2 mt-6">
                <Text className="font-syne font-bold text-[16px] text-charcoal">
                  Current Password
                </Text>
                <View className="flex flex-row gap-2 border border-secondary py-4 px-3">
                  <Input
                    label="Current Password"
                    placeholder="Enter your current password"
                    value={formik.values.currentPassword}
                    handleChangeText={formik.handleChange("currentPassword")}
                  />
                </View>
              </View>

              {/* New Password */}
              <View className="flex flex-col gap-2 mt-6">
                <Text className="font-syne font-bold text-[16px] text-charcoal">
                  Create a new Password
                </Text>
                <View className="flex flex-row gap-2 border border-secondary py-4 px-3">
                  <Input
                    label="New Password"
                    placeholder="Enter your new password"
                    value={formik.values.newPassword}
                    handleChangeText={formik.handleChange("newPassword")}
                  />
                </View>
              </View>

              {/* Confirm New Password */}
              <View className="flex flex-col gap-2 mt-6">
                <Text className="font-syne font-bold text-[16px] text-charcoal">
                  Confirm New Password
                </Text>
                <View className="flex flex-row gap-2 border border-secondary py-4 px-3">
                  <Input
                    label="Confirm New Password"
                    placeholder="Re-enter your new password"
                    value={formik.values.confirmNewPassword}
                    handleChangeText={formik.handleChange("confirmNewPassword")}
                  />
                </View>
              </View>

              {errorMessage && (
                <AuthError
                  message={errorMessage}
                  otherClass="px-[8px] py-[12px] items-center mt-6"
                />
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default UpdatePassword;
