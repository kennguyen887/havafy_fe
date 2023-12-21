export function validatePassword(password: string) {
  // Minimum length of 8 characters
  const minLength = 8;

  // At least one uppercase letter
  const hasUpperCase = /[A-Z]/.test(password);

  // At least one number
  const hasNumber = /\d/.test(password);

  // Password should meet all criteria
  return password.length >= minLength && hasUpperCase && hasNumber;
}
