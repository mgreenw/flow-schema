// @flow

import FS from '../..';

describe('Number Schema', () => {
  it('should accept anything as input and should fail if the value is not a number', () => {
    expect(FS.number.validate(123)).toBe(123);
    expect(FS.number.validate(0)).toBe(0);
    expect(FS.number.validate(Number.NaN)).toBe(Number.NaN);

    expect(() => FS.number.validate('String')).toThrow(FS.ValidationError);
    expect(() => FS.number.validate(undefined)).toThrow(FS.ValidationError);
    expect(() => FS.number.validate(true)).toThrow(FS.ValidationError);
    expect(() => FS.number.validate(new Date())).toThrow(FS.ValidationError);
    expect(() => FS.number.validate(null)).toThrow(FS.ValidationError);
    expect(() => FS.number.validate({})).toThrow(FS.ValidationError);
    expect(() => FS.number.validate({ with: 'props' })).toThrow(FS.ValidationError);

    const result = FS.number.validate(11100011);
    (result: number);
    // $ExpectError
    (result: void);
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
