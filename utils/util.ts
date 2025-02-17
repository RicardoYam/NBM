export function returnRequiredMessages(errors: string) {
  return `Oops! It looks like you have not entered an ${errors}. This is a required step.`;
}

export function returnWrongEmailFormatMessages(errors: string) {
  return "Oops! It looks like you have not entered an valid email address.";
}

export const generateAustralianMobileNumber = (): string => {
  const prefix = "0401";
  const rest = Array.from({ length: 6 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  return `${prefix}${rest}`;
};

export const getDate = (timeStamp: string): string => {
  const date = new Date(timeStamp);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
};
