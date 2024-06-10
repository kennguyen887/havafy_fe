export function formatDateString(input: string) {
  let value = input.replace(/[^\d]/g, ''); // Remove non-digit characters

  if (value.length > 6) value = value.slice(0, 6); // Limit to 6 digits (YYYYMM)

  let formattedValue = value;

  if (value.length >= 5) {
    formattedValue = value.slice(0, 4) + '-' + value.slice(4, 6);
  } else if (value.length >= 4) {
    formattedValue = value.slice(0, 4) + '-' + value.slice(4);
  }

  return formattedValue;
}

export const validateDate = (dateString: string) => {
  const regex = /^\d{4}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const [year, month] = dateString.split('-').map(Number);

  if (year < 1900 || year > new Date().getFullYear()) return false; // Validate year range
  if (month < 1 || month > 12) return false; // Validate month range

  return true;
};
