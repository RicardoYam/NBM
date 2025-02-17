import { View, Text, TouchableOpacity } from "react-native";
import Svg, { Rect } from "react-native-svg";
import Icon from "react-native-vector-icons/Feather";

interface Props {
  pickImageAsync: () => void;
}

const AuthImageSelection = ({ pickImageAsync }: Props) => {
  return (
    <TouchableOpacity
      className="relative w-full h-[106px] mt-8"
      activeOpacity={0.7}
      onPress={pickImageAsync}
    >
      <Svg height="100%" width="100%" className="absolute">
        <Rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke="#383939"
          strokeWidth="2"
          strokeDasharray="6, 8"
          rx="0"
        />
      </Svg>

      <View className="absolute inset-0 flex flex-row items-center justify-center gap-6">
        <Icon name="upload" size={16} color="#383939" />

        <View>
          <Text className="text-charcoal font-bold text-base font-syne">
            Select a file
          </Text>
          <Text className="text-charcoal font-normal text-base font-syne">
            JPG or PNG, file size no more than 10MB
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AuthImageSelection;
