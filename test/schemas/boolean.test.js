// @flow

import FS from '../..';

describe('Boolean Schema', () => {
  it('should accept anything as input and should fail if the value is not a boolean', () => {
    expect(FS.boolean.validate(true)).toBe(true);
    expect(FS.boolean.validate(false)).toBe(false);

    expect(() => FS.boolean.validate('String')).toThrow(FS.ValidationError);
    expect(() => FS.boolean.validate(undefined)).toThrow(FS.ValidationError);
    expect(() => FS.boolean.validate(new Date())).toThrow(FS.ValidationError);
    expect(() => FS.boolean.validate(null)).toThrow(FS.ValidationError);
    expect(() => FS.boolean.validate(123)).toThrow(FS.ValidationError);
    expect(() => FS.boolean.validate({})).toThrow(FS.ValidationError);
    expect(() => FS.boolean.validate({ with: 'props' })).toThrow(FS.ValidationError);

    const result = FS.boolean.validate(true);
    (result: boolean);
    // $ExpectError
    (result: void);
    // $ExpectError
    (result: string);
    // $ExpectError
    (result: Date);
    // $ExpectError
    (result: null);
    // $ExpectError
    (result: number);
    // $ExpectError
    (result: {});
  });
});
