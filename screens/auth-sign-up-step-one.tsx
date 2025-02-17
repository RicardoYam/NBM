import { Text, View } from "react-native";
import FormField from "../components/form-field";
import Button from "../components/button";
import { router } from "expo-router";
import AuthError from "../components/auth-error";
import Input from "../components/input";
import AuthFooter from "@/components/auth-footer";

interface Props {
  title: string;
  subTitle: string;
  isError: boolean;
  setIsError: (value: boolean) => void;
  handleErrors: () => void;
  formik: any;
}

const AuthSignUpStepOne = ({
  isError,
  setIsError,
  handleErrors,
  formik,
  title,
  subTitle,
}: Props) => {
  const handleStepTwo = async () => {
    const errors = await formik.validateForm();

    if (errors.firstName || errors.lastName || errors.email) {
      handleErrors();
      return;
    }

    setIsError(false);
    router.push("/sign-up?step=2");
  };

  return (
    <View className="flex-1">
      {/* Title */}
      <View className="gap-4">
        <Text className="font-bold text-[24px] font-syne">{title}</Text>
        <Text className="font-normal text-[16px] font-syne">{subTitle}</Text>
      </View>

      <View className="flex flex-col flex-1 pt-8">
        {/* Step 1 */}
        <View className="gap-2">
          <FormField
            label="Your name"
            placeholder="Enter your first name here"
            value={formik.values.firstName}
            handleChangeText={formik.handleChange("firstName")}
          />
          <View className="flex flex-row items-center justify-between w-full border border-outlet px-3 py-4">
            <Input
              label="Last name"
              placeholder="Enter your last name here"
              value={formik.values.lastName}
              handleChangeText={formik.handleChange("lastName")}
            />
          </View>

          <FormField
            label="Email"
            placeholder="you@email.com.au"
            value={formik.values.email}
            handleChangeText={formik.handleChange("email")}
          />

          {/* Error */}
          {isError && (
            <View className="pt-8">
              <AuthError
                message={String(Object.values(formik.errors)[0])}
                otherClass="px-[8px] py-[12px] items-center"
              />
            </View>
          )}

          <View className="py-8">
            <Button
              label="Next"
              icon="arrow-forward-sharp"
              isPrimary={true}
              containerClassName="py-[16px] px-[14px]"
              handlePress={handleStepTwo}
            ></Button>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View className="py-2">
        <AuthFooter isSignIn={false} />
      </View>
    </View>
  );
};

export default AuthSignUpStepOne;
