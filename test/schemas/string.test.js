// @flow

import FS from '../..';

describe('String Schema', () => {
  it('should accept anything as input and should fail if the value is not a string', () => {
    expect(FS.string.validate('String')).toBe('String');
    expect(FS.string.validate('1234')).toBe('1234');
    expect(FS.string.validate('')).toBe('');

    expect(() => FS.string.validate(123)).toThrow(FS.ValidationError);
    expect(() => FS.string.validate(true)).toThrow(FS.ValidationError);
    expect(() => FS.string.validate(new Date())).toThrow(FS.ValidationError);
    expect(() => FS.string.validate(undefined)).toThrow(FS.ValidationError);
    expect(() => FS.string.validate(null)).toThrow(FS.ValidationError);
    expect(() => FS.string.validate({})).toThrow(FS.ValidationError);
    expect(() => FS.string.validate({ with: 'props' })).toThrow(FS.ValidationError);

    const result = FS.string.validate('ha');
    (result: string);
    // $ExpectError
    (result: number);
    // $ExpectError
    (result: boolean);
    // $ExpectError
    (result: Date);
    // $ExpectError
    (result: void);
    // $ExpectError
    (result: null);
    // $ExpectError
    (result: {});
  });
});
