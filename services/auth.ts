import { generateAustralianMobileNumber } from "@/utils/util";
import nbmClient from ".";
import { Address } from "@/types/address";

export const signInUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await nbmClient.post("/auth/login", { email, password });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signUpUser = async ({
  firstName,
  lastName,
  avatar,
  email,
  address,
  password,
  confirmPassword,
}: {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
  address: Address;
  password: string;
  confirmPassword: string;
}) => {
  try {
    console.log({
      firstName,
      lastName,
      avatar,
      email,
      telephone: generateAustralianMobileNumber(),
      address,
      password,
      confirmPassword,
    });
    const response = await nbmClient.post("/auth/register", {
      firstName,
      lastName,
      avatar,
      email,
      telephone: generateAustralianMobileNumber(),
      address,
      password,
      confirmPassword,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
