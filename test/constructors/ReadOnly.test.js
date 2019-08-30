/* eslint-disable flowtype/generic-spacing */
// @flow

import FS from '../..';

describe('$ReadOnly Schema', () => {
  // It should not accept non-schema values
  it('should mark an object as ReadOnly', () => {
    (FS.$ReadOnly(
      FS.Object({
        string: FS.string,
        boolean: FS.boolean.nullable,
      })
    ).validate({ string: '123', boolean: null }): $ReadOnly<{
      string: string,
      boolean: boolean | null,
    }>);
  });

  it('should mark an array as ReadOnly', () => {
    (FS.$ReadOnlyArray(FS.Array(FS.string)).validate(['one', 'two', 'three']): $ReadOnlyArray<
      string[]
    >);
  });
});
