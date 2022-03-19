// tel number with country code
export const validatePhoneNumber = (phone: string) => {
  return phone.match(/^(\+\d{3}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{3}$/);
};
