/**
 * simple email validation
 * @param email
 * @returns boolean whether email is valid format
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

export default isValidEmail;
