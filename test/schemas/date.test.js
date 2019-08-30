// @flow

import FS from '../..';

describe('Date Schema', () => {
  it('should accept anything as input and should fail if the value is not a Date', () => {
    const date = new Date();
    expect(FS.Date.validate(date)).toBe(date);

    expect(() => FS.Date.validate('String')).toThrow(FS.ValidationError);
    expect(() => FS.Date.validate(undefined)).toThrow(FS.ValidationError);
    expect(() => FS.Date.validate(true)).toThrow(FS.ValidationError);
    expect(() => FS.Date.validate(null)).toThrow(FS.ValidationError);
    expect(() => FS.Date.validate(123)).toThrow(FS.ValidationError);
    expect(() => FS.Date.validate({})).toThrow(FS.ValidationError);
    expect(() => FS.Date.validate({ with: 'props' })).toThrow(FS.ValidationError);

    const result = FS.Date.validate(new Date());
    (result: Date);
    // $ExpectError
    (result: void);
    // $ExpectError
    (result: string);
    // $ExpectError
    (result: boolean);
    // $ExpectError
    (result: null);
    // $ExpectError
    (result: number);
    // $ExpectError
    (result: {||});
  });
});
