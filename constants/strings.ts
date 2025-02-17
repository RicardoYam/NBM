export function REQUIRED_MESSAGE(errors: string) {
  return `Oops! It looks like you have not entered an ${errors}. This is a required step.`;
}

export function WRONG_FORMAT_MESSAGE() {
  return "Oops! It looks like you have not entered an valid email address.";
}
