export const readableNumber = (value: string): string => {
  if (value.length < 4) {
    // If the price string has less than 4 characters, just return it as is
    return value;
  } else {
    // Insert a period (.) after the third character and return the modified string
    return value.slice(0, 3) + '.' + value.slice(3);
  }
};
