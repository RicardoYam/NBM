import { View } from "react-native";
import FormField from "./form-field";
import Button from "./button";
import AuthError from "./auth-error";
import { useFormik } from "formik";

interface Props {
  handleSignIn: (values: { email: string; password: string }) => void;
  isError: boolean;
}

const AuthSignInForm = ({ handleSignIn, isError }: Props) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleSignIn(values);
    },
  });

  return (
    <View className="flex flex-col gap-2">
      <FormField
        label="Email"
        placeholder="you@email.com.au"
        value={formik.values.email}
        handleChangeText={formik.handleChange("email")}
      />

      <FormField
        label="Password"
        placeholder="Enter your password"
        value={formik.values.password}
        handleChangeText={formik.handleChange("password")}
      />

      <View className="py-8">
        <Button
          label="Next"
          icon="arrow-forward-sharp"
          isPrimary={true}
          containerClassName="py-[16px] px-[14px]"
          handlePress={formik.handleSubmit}
        ></Button>
      </View>

      {/* Error */}
      {isError && (
        <AuthError
          message="Oops! Those details don’t seem to match. Check the details you entered
              are correct and try again."
          otherClass="px-[8px] py-[12px] items-start"
        />
      )}
    </View>
  );
};

export default AuthSignInForm;
