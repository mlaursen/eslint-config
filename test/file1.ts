import { Example, example } from "./file2";

const example2: Example = "b";

// these should all fail curly rule

if (example2) example2.charAt(1);
if (example) example.charAt(1);
