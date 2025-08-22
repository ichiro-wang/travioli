export const currentDateFormatted = () => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, "0"); // zero-padded
  const day = String(now.getUTCDate()).padStart(2, "0"); // zero-padded

  return `${year}-${month}-${day}`;
};
