import { Text, View } from "react-native";
import FormField from "../components/form-field";
import Button from "../components/button";
import { router } from "expo-router";
import Checkbox from "expo-checkbox";
import { useState } from "react";
import AuthError from "@/components/auth-error";
import AuthPasswordTips from "@/components/auth-password-tips";
import { FormikProps } from "formik";
import { SIGN_UP_INITIAL_VALUES } from "@/constants/initials";

interface Props {
  title: string;
  subTitle: string;
  isError: boolean;
  handleErrors: () => void;
  formik: FormikProps<typeof SIGN_UP_INITIAL_VALUES>;
}

const AuthSignUpStepThree = ({
  isError,
  handleErrors,
  formik,
  title,
  subTitle,
}: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleStepFour = async () => {
    const errors = await formik.validateForm();

    if (errors.password || errors.confirmPassword) {
      setMessage(String(Object.values(formik.errors)[0]));
      handleErrors();
      return;
    }

    if (!isChecked) {
      setMessage("Please agree to the terms and conditions.");
      handleErrors();
      return;
    }

    router.push("/sign-up?step=4");
  };

  return (
    <>
      {/* Title */}
      <View className="flex gap-4">
        <Text className="font-bold text-[24px] font-syne">{title}</Text>
        <Text className="font-normal text-[16px] font-syne">{subTitle}</Text>
      </View>

      <View className="flex flex-col flex-1 pt-8">
        {/* Step 3 */}
        <View className="gap-2">
          <FormField
            label="Create a Password"
            placeholder="Enter your password"
            value={formik.values.password}
            handleChangeText={formik.handleChange("password")}
          />

          <FormField
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={formik.values.confirmPassword}
            handleChangeText={formik.handleChange("confirmPassword")}
          />

          <AuthPasswordTips />

          {isError && (
            <View className="pt-8">
              <AuthError
                message={message}
                otherClass="px-[8px] py-[12px] items-center"
              />
            </View>
          )}

          {/* Checkbox */}
          <View className="flex flex-row items-center mt-6 gap-2">
            <Checkbox
              style={{
                width: 18,
                height: 18,
                borderWidth: 2,
                borderColor: "#38393933",
              }}
              value={isChecked}
              onValueChange={() => setIsChecked(!isChecked)}
            />
            <Text className="font-syne font-normal text-[14px] text-[#38393966] flex-1">
              By ticking this box, I agree to the terms and conditions of NBM.
            </Text>
          </View>

          <View className="py-4">
            <Button
              label="Next"
              icon="arrow-forward-sharp"
              isPrimary={true}
              containerClassName="py-[16px] px-[14px]"
              handlePress={handleStepFour}
            ></Button>
          </View>
        </View>
      </View>
    </>
  );
};

export default AuthSignUpStepThree;
