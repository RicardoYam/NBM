import { Text, View, TouchableOpacity } from "react-native";
import Button from "../components/button";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import ImageUpload from "@/components/image-upload";
import AuthImageSelection from "@/components/auth-image-selection";
import { FormikProps } from "formik";
import { SIGN_UP_INITIAL_VALUES } from "@/constants/initials";

interface Props {
  title: string;
  subTitle: string;
  isError: boolean;
  handleErrors: () => void;
  formik: FormikProps<typeof SIGN_UP_INITIAL_VALUES>;
}

const AuthSignUpStepThree = ({ formik, title, subTitle }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [status, requestPermission] = MediaLibrary.usePermissions();

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      if (result.assets[0].base64) {
        setSelectedImage(result.assets[0].base64);
      }
    } else {
      alert("You did not select any image.");
    }
  };

  const handleCreate = () => {
    formik.setFieldValue("avatar", selectedImage);
    formik.handleSubmit();
  };

  const handleSkip = () => {
    formik.setFieldValue("avatar", "");
    formik.handleSubmit();
  };

  if (status === null) {
    requestPermission();
  }

  return (
    <>
      {/* Title */}
      <View className="gap-4">
        <Text className="font-bold text-[24px] font-syne">{title}</Text>
        <Text className="font-normal text-[16px] font-syne">{subTitle}</Text>
      </View>

      {/* Upload Image */}
      {selectedImage ? (
        <ImageUpload
          selectedImage={selectedImage}
          pickImageAsync={pickImageAsync}
        />
      ) : (
        <AuthImageSelection pickImageAsync={pickImageAsync} />
      )}

      <View className="flex flex-col flex-1 mt-4">
        {/* Step 4 */}
        <View className="gap-2">
          <View className="pt-6 pb-2">
            <Button
              label="Create my Account"
              icon="arrow-forward-sharp"
              isPrimary={true}
              containerClassName="py-[16px] px-[14px]"
              handlePress={handleCreate}
            ></Button>
          </View>

          <View className="items-center">
            <TouchableOpacity activeOpacity={0.7} onPress={handleSkip}>
              <Text className="underline underline-offset-1 font-normal text-[16px] font-syne text-charcoal">
                Skip for now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default AuthSignUpStepThree;
