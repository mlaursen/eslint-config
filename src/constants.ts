export const DEV_WARNING_PROD_ERROR =
  process.env.NODE_ENV !== "production" ? "warn" : "error";

export const TEST_FILES = [
  "**/__tests__/**",
  "**/*.{spec,test}.{ts,tsx,js,jsx}",
];

export const JSX_FILES = ["**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"];
