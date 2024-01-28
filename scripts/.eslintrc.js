module.exports = {
  root: true,
  extends: ["../index.js"],
  parserOptions: {
    project: "../tsconfig.json",
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "no-console": 0,
  },
};
