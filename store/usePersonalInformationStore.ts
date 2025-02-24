import { PERSONAL_INFORMATION_INITIAL_VALUES } from "@/constants/initials";
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
    personalInformations: PERSONAL_INFORMATION_INITIAL_VALUES,

    setPersonalInformations: (info) =>
      set((state) => ({
        personalInformations: { ...state.personalInformations, ...info },
      })),

    clearPersonalInformations: () =>
      set({
        personalInformations: PERSONAL_INFORMATION_INITIAL_VALUES,
      }),
  })
);
