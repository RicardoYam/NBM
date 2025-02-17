import { View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { images } from "../constants";
import AuthStepIndicator from "./auth-step-indicator";

interface Props {
  step: number;
  handlePrev: () => void;
}

const AuthHeader = ({ step, handlePrev }: Props) => {
  return (
    <View className="flex flex-col">
      <View className="flex flex-row items-center justify-between">
        <TouchableOpacity onPress={handlePrev} activeOpacity={0.7}>
          <Icon name="arrow-back-sharp" size={20} color="#6537FF" />
        </TouchableOpacity>

        <View className="flex flex-row items-center justify-between gap-2 absolute left-1/2 -translate-x-1/2">
          <Text className="font-bold font-syne text-[20px] text-primary">
            NBM
          </Text>
          <Image source={images.AuthHeaderLogo} className="w-9 h-6" />
        </View>
      </View>

      {/* Indicator */}
      {step > 0 && (
        <View className="w-full flex flex-row items-center justify-center gap-2 mt-6">
          {[1, 2, 3, 4].map((_, index) => (
            <View key={index}>
              {index + 1 <= step ? (
                <AuthStepIndicator isActive={true} />
              ) : (
                <AuthStepIndicator isActive={false} />
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default AuthHeader;
