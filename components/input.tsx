import { TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  label: string;
  placeholder: string;
  value: string;
  showPassword?: boolean;
  handleShowPassword?: () => void;
  handleChangeText?: (e: string) => void;
}

const Input = ({
  label,
  placeholder,
  value,
  showPassword,
  handleChangeText,
  handleShowPassword,
  ...props
}: Props) => {
  return (
    <>
      <TextInput
        className="flex-1 font-syne font-normal text-[16px] text-[#010214]"
        placeholder={placeholder}
        placeholderTextColor="#01021466"
        value={value}
        secureTextEntry={
          label.toLowerCase().includes("password") && !showPassword
        }
        onChangeText={handleChangeText}
        {...props}
      />

      {label.toLowerCase().includes("password") && (
        <TouchableOpacity onPress={handleShowPassword} activeOpacity={0.7}>
          <Icon
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={24}
            color="#01021466"
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export default Input;
