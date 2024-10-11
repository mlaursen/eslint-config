// @ts-check
import { config, configs } from "./dist/index.js";

export default config(...configs.typescriptTypeChecking(import.meta.dirname));