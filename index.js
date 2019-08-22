// @flow

import * as Flow from './lib';
export { Flow };

const J = Flow.Object({
  n: Flow.string,
  y: Flow.number,
});

const q = Flow.Object(Flow.number, {
  n: Flow.string,
  y: Flow.number,
});

const f = q.validate(10);
const n = f.y;

const z = Flow.omap(Flow.number);
