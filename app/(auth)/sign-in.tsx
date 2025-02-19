import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AuthHeader from "@/components/auth-header";
import { router } from "expo-router";
import AuthFooter from "@/components/auth-footer";
import AuthSignInForm from "@/components/auth-sign-in-form";
import { useMutation } from "@tanstack/react-query";
import { signInUser } from "@/services/auth";
import { User } from "@/types/user";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "@/components/loading";
import { usePersonalInformationStore } from "@/store/usePersonalInformationStore";

const SignIn = () => {
  const [isError, setIsError] = useState(false);
  const { setPersonalInformations } = usePersonalInformationStore();

  const signInUserQuery = useMutation<
    User,
    Error,
    { email: string; password: string }
  >({
    mutationKey: ["signInUser"],
    mutationFn: (credentials) => signInUser(credentials),
    onSuccess: (data) => {
      setIsError(false);

      AsyncStorage.setItem("userId", data.user.id.toString());
      AsyncStorage.setItem("token", data.accessToken);

      setPersonalInformations({
        id: data.user.id.toString(),
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
      });

      router.push("/feed");
    },
    onError: () => {
      setIsError(true);
    },
  });

  const handleSignIn = (values: { email: string; password: string }) => {
    if (!values.email || !values.password) {
      setIsError(true);
    }
    signInUserQuery.mutate(values);
  };

  if (signInUserQuery.isPending) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <View className="flex flex-col h-full px-6">
        <StatusBar style="dark" translucent />

        {/* Header */}
        <View className="pt-10 pb-14">
          <AuthHeader step={0} handlePrev={() => router.back()} />
        </View>

        {/* Title */}
        <View className="gap-4">
          <Text className="font-bold text-[24px] font-syne">Log In</Text>
          <Text className="font-normal text-[16px] font-syne">
            Enter your details to log into your account.
          </Text>
        </View>

        {/* Form */}
        <View className="flex-1 pt-8">
          <AuthSignInForm handleSignIn={handleSignIn} isError={isError} />
        </View>

        {/* Footer */}
        <View className="py-2">
          <AuthFooter isSignIn={true} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
