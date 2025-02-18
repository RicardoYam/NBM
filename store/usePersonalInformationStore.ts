import { create } from "zustand";

interface PersonalInformation {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
}

interface PersonalInformationState {
  personalInformations: PersonalInformation;
  setPersonalInformations: (info: Partial<PersonalInformation>) => void;
  clearPersonalInformations: () => void;
}

export const usePersonalInformationStore = create<PersonalInformationState>(
  (set) => ({
    personalInformations: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      address: "",
    },

    setPersonalInformations: (info) =>
      set((state) => ({
        personalInformations: { ...state.personalInformations, ...info },
      })),

    clearPersonalInformations: () =>
      set({
        personalInformations: {
          id: "",
          firstName: "",
          lastName: "",
          email: "",
          address: "",
        },
      }),
  })
);
