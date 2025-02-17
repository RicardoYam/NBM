import { Text, View, TouchableOpacity } from "react-native";
import FormField from "../components/form-field";
import Button from "../components/button";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { getPlaceAutoCompletion, getPlaceDetails } from "@/services/google";
import { useState } from "react";
import Ion from "react-native-vector-icons/Ionicons";
import { Prediction } from "@/types/address";

interface Props {
  title: string;
  subTitle: string;
  isError: boolean;
  handleErrors: () => void;
  formik: any;
}

const AuthSignUpStepTwo = ({ formik, title, subTitle }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [addressPredictions, setAddressPredictions] = useState<Prediction[]>(
    []
  );

  const handleStepThree = () => {
    router.push("/sign-up?step=3");
  };

  const autoCompletionMutation = useMutation({
    mutationKey: ["autoCompletion"],
    mutationFn: (input: string) => getPlaceAutoCompletion({ input }),
    onSuccess: (data) => {
      setAddressPredictions(data.predictions);
    },
  });

  const addressDetailsMutation = useMutation({
    mutationKey: ["addressDetails"],
    mutationFn: (placeId: string) => getPlaceDetails({ placeId }),
    onSuccess: (data) => {
      const addressComponents = data.result.address_components;

      const getComponent = (type: string) => {
        const component = addressComponents.find((comp: any) =>
          comp.types.includes(type)
        );
        return component ? component.long_name : "";
      };

      const formattedAddress = {
        street: getComponent("route"),
        city: getComponent("locality"),
        state: getComponent("administrative_area_level_1"),
        postalCode: getComponent("postal_code"),
        number: getComponent("street_number"),
        country: getComponent("country"),
      };

      formik.setFieldValue("address", formattedAddress, true);
    },
  });

  const handleAddressChange = (input: string) => {
    setSearchQuery(input);

    if (input.trim().length > 0) {
      autoCompletionMutation.mutate(input);
    } else {
      setAddressPredictions([]);
    }
  };

  const handleAddressSelection = (place_id: string) => {
    const selectedAddress = addressPredictions.find(
      (pred) => pred.place_id === place_id
    )?.description;

    if (selectedAddress) {
      setSearchQuery(selectedAddress);
      addressDetailsMutation.mutate(place_id);
    }
  };

  return (
    <>
      {/* Title */}
      <View className="gap-4">
        <Text className="font-bold text-[24px] font-syne">{title}</Text>
        <Text className="font-normal text-[16px] font-syne">{subTitle}</Text>
      </View>

      <View className="flex flex-col flex-1 pt-8">
        {/* Step 1 */}
        <View className="gap-2">
          <FormField
            label="Enter your address"
            placeholder="Start typing..."
            value={searchQuery}
            handleChangeText={handleAddressChange}
          />

          {/* Address Suggestions */}
          {searchQuery &&
            addressPredictions.slice(0, 5).map((prediction) => (
              <TouchableOpacity
                key={prediction.place_id}
                className="flex flex-row items-center gap-2 p-4"
                onPress={() => handleAddressSelection(prediction.place_id)}
              >
                <Text className="flex-1">{prediction?.description}</Text>
                <Ion name="chevron-forward" size={20} color="#383939" />
              </TouchableOpacity>
            ))}

          {/* Next Button */}
          <View className="py-8">
            <Button
              label="Next"
              icon="arrow-forward-sharp"
              isPrimary={true}
              containerClassName="py-[16px] px-[14px]"
              handlePress={handleStepThree}
              isDisabled={formik.values.address.street === ""}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default AuthSignUpStepTwo;
