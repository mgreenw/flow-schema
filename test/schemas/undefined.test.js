// @flow

import FS from '../..';

describe('Void Schema', () => {
  it('should accept anything as input and should fail if the value is not undefined', () => {
    expect(FS.void.validate(undefined)).toBe(undefined);

    expect(() => FS.void.validate('String')).toThrow(FS.ValidationError);
    expect(() => FS.void.validate(123)).toThrow(FS.ValidationError);
    expect(() => FS.void.validate(true)).toThrow(FS.ValidationError);
    expect(() => FS.void.validate(new Date())).toThrow(FS.ValidationError);
    expect(() => FS.void.validate(null)).toThrow(FS.ValidationError);
    expect(() => FS.void.validate({})).toThrow(FS.ValidationError);
    expect(() => FS.void.validate({ with: 'props' })).toThrow(FS.ValidationError);

    const result = FS.void.validate(undefined);
    (result: void);
    // $ExpectError
    (result: number);
    // $ExpectError
    (result: string);
    // $ExpectError
    (result: boolean);
    // $ExpectError
    (result: Date);
    // $ExpectError
    (result: null);
    // $ExpectError
    (result: {});
  });
});
