import { generateAustralianMobileNumber } from "@/utils/util";
import nbmClient from ".";
import { Address } from "@/types/address";
import axios from "axios";

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

export const getUploadUrl = async ({
  firstName,
  lastName,
}: {
  firstName: string;
  lastName: string;
}) => {
  try {
    const fileName = `${firstName}-${lastName}`;
    const response = await nbmClient.get("/files/upload/images", {
      params: {
        fileName,
        folder: "avatar",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const uploadUserAvatar = async ({
  url,
  file,
}: {
  url: string;
  file: string;
}) => {
  try {
    var formData = new FormData();
    formData.append("file", file);

    const response = await axios.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const getTermsOfService = async () => {
  try {
    const response = await nbmClient.get("/terms-conditions");

    return response.data;
  } catch (error) {
    throw error;
  }
};
