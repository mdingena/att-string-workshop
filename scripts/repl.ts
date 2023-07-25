import { start } from 'node:repl';
import * as transcoder from 'att-string-transcoder';

const repl = start();

for (const [key, value] of Object.entries(transcoder)) {
  Object.defineProperty(repl.context, key, {
    configurable: false,
    enumerable: true,
    value
  });
}
