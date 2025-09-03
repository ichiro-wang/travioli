export const isInDevelopmentEnv = (): boolean => {
  return ["development", "test"].includes(
    process.env.NODE_ENV || "development"
  );
};
