/* eslint-disable flowtype/generic-spacing */
// @flow

import { Flow } from '../..';

describe('$ReadOnly Schema', () => {
  // It should not accept non-schema values
  it('should mark an object as ReadOnly', () => {
    (Flow.$ReadOnly(
      Flow.Object({
        string: Flow.string,
        boolean: Flow.boolean.nullable,
      })
    ).validate({ string: '123', boolean: null }): $ReadOnly<{
      string: string,
      boolean: boolean | null,
    }>);
  });

  it('should mark an array as ReadOnly', () => {
    (Flow.$ReadOnlyArray(Flow.Array(Flow.string)).validate(['one', 'two', 'three']): $ReadOnlyArray<
      string[]
    >);
  });
});
