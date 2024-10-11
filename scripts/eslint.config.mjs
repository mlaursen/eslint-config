import { config, configs } from "../dist/index.js";

export default config(...configs.typescript, {
  rules: {
    "no-console": "off",
  },
});
