export const isValidUrl = (input) => {
  return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(input.trim());
};