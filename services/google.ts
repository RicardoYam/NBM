import { googleClient } from ".";

export const getPlaceAutoCompletion = async ({ input }: { input: string }) => {
  try {
    const response = await googleClient.post("/autocomplete/json", null, {
      params: {
        input: input,
        types: "street_address",
        key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPlaceDetails = async ({ placeId }: { placeId: string }) => {
  try {
    const response = await googleClient.post("/details/json", null, {
      params: {
        fields: "name,formatted_address,address_components",
        place_id: placeId,
        key: process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
