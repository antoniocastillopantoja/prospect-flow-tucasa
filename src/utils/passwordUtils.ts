
/**
 * Utility functions for password management
 */

/**
 * Generates a random temporary password
 * @returns A random string to be used as a temporary password
 */
export const generateTemporaryPassword = (): string => {
  const length = 8;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  
  // Ensure at least one uppercase, one lowercase, one number, and one special character
  password += "A"; // uppercase
  password += "a"; // lowercase
  password += "1"; // number
  password += "!"; // special

  // Fill the rest with random characters
  for (let i = password.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  // Shuffle the password characters
  return password
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');
};

/**
 * Checks if a password is temporary (based on some pattern)
 * @param password The password to check
 * @returns True if the password is temporary, false otherwise
 */
export const isTemporaryPassword = (password: string): boolean => {
  // In a real application, you would check against stored flags in the database
  // For this example, we're checking if it's in localStorage
  const tempPasswords = JSON.parse(localStorage.getItem("tempPasswords") || "{}");
  return Object.values(tempPasswords).includes(password);
};
