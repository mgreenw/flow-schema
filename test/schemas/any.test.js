// @flow

import FS from '../..';

describe('Any Schema', () => {
  it('should accept anything as input and should never fail', () => {
    expect(FS.any.validate('String')).toBe('String');
    expect(FS.any.validate(123)).toBe(123);
    expect(FS.any.validate(true)).toBe(true);

    const date = new Date();
    expect(FS.any.validate(date)).toBe(date);

    const emptyObj = {};
    expect(FS.any.validate(emptyObj)).toBe(emptyObj);

    const obj = { with: 'properties', that: 'are', very: 117 };
    expect(FS.any.validate(obj)).toBe(obj);

    (FS.any.validate('hehe'): any);
  });
});
