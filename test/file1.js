import { example } from './file2.ts';

const example2 = 'b';

// these should all fail curly rule
if (example2) example2.charAt(1);
if (example) example.charAt(1);
