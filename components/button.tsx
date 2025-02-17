import { Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  label: string;
  icon?: string;
  isPrimary?: boolean;
  containerClassName?: string;
  textClassName?: string;
  handlePress?: () => void;
  isDisabled?: boolean;
}

const Button = ({
  label,
  icon,
  isPrimary,
  containerClassName,
  textClassName,
  handlePress,
  isDisabled,
}: Props) => {
  if (isPrimary) {
    return (
      <TouchableOpacity
        className={`bg-primary flex flex-row items-center justify-center gap-2 ${containerClassName} ${isDisabled ? "opacity-40" : ""}`}
        disabled={isDisabled}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Text
          className={`text-white font-normal text-base text-center ${textClassName}`}
        >
          {label}
        </Text>
        {icon && <Icon name={icon} size={18} color="#ffffff" />}
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        className={`bg-white border-primary border-[2px] flex flex-row items-center justify-center gap-2 ${containerClassName}`}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <Text
          className={`text-primary font-normal text-base text-center${textClassName}`}
        >
          {label}
        </Text>
        {icon && <Icon name={icon} size={18} color="#6537FF" />}
      </TouchableOpacity>
    );
  }
};

export default Button;
