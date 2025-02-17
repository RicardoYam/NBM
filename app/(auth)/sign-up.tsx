import { ScrollView, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { router, useLocalSearchParams } from "expo-router";
import Loading from "@/components/loading";
import StepOne from "@/screens/auth-sign-up-step-one";
import StepTwo from "@/screens/auth-sign-up-step-two";
import StepThree from "@/screens/auth-sign-up-step-three";
import StepFour from "@/screens/auth-sign-up-step-four";
import { useFormik } from "formik";
import AuthHeader from "@/components/auth-header";
import { VALIDATIONSCHEMA_SIGN_UP } from "@/constants/schema";
import { useMutation } from "@tanstack/react-query";
import { SignUpUser } from "@/types/user";
import { signUpUser } from "@/services/auth";
import { Address } from "@/types/address";

const SignUp = () => {
  const { step = "1" } = useLocalSearchParams();
  const currentStep = parseInt(Array.isArray(step) ? step[0] : step, 10);
  const [isError, setIsError] = useState(false);

  const signUpMutattion = useMutation<
    SignUpUser,
    Error,
    {
      firstName: string;
      lastName: string;
      email: string;
      address: Address;
      password: string;
      confirmPassword: string;
      avatar: string;
    }
  >({
    mutationKey: ["signUp"],
    mutationFn: async (data) => {
      return signUpUser({
        ...data,
        address: data.address,
      });
    },
    onSuccess: () => {
      router.push("/sign-in");
    },
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      address: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        number: "",
        country: "",
      },
      password: "",
      confirmPassword: "",
      avatar: "",
    },
    validationSchema: VALIDATIONSCHEMA_SIGN_UP,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values: {
      firstName: string;
      lastName: string;
      email: string;
      address: Address;
      password: string;
      confirmPassword: string;
      avatar: string;
    }) => {
      signUpMutattion.mutate(values);
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" translucent />

      <View className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="w-full">
          <View className="flex flex-1 flex-col px-6">
            {/* Header */}
            <View className="pt-10 pb-14">
              <AuthHeader step={currentStep} handlePrev={() => router.back()} />
            </View>

            {currentStep === 1 && (
              <StepOne
                isError={isError}
                setIsError={setIsError}
                handleErrors={() => setIsError(true)}
                formik={formik}
                title="Create your Account"
                subTitle="Enter your details below to start creating your brand new account."
              />
            )}
            {currentStep === 2 && (
              <StepTwo
                isError={isError}
                handleErrors={() => setIsError(true)}
                formik={formik}
                title="Where are you Located?"
                subTitle="Add your address. Select your address from the suggested address below."
              />
            )}
            {currentStep === 3 && (
              <StepThree
                isError={isError}
                handleErrors={() => setIsError(true)}
                formik={formik}
                title="Let’s Secure your Account"
                subTitle="Let’s keep your NBM account safe with a secure password."
              />
            )}
            {currentStep === 4 && (
              <StepFour
                isError={isError}
                handleErrors={() => setIsError(true)}
                formik={formik}
                title="Upload a Profile Picture"
                subTitle="Let’s put a name to a face. Upload a profile picture to complete your profile. This is an optional step."
              />
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
