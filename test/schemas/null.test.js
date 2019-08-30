// @flow

import FS from '../..';

describe('Null Schema', () => {
  it('should accept anything as input and should fail if the value is not null', () => {
    expect(FS.null.validate(null)).toBe(null);

    expect(() => FS.null.validate('String')).toThrow(FS.ValidationError);
    expect(() => FS.null.validate(undefined)).toThrow(FS.ValidationError);
    expect(() => FS.null.validate(true)).toThrow(FS.ValidationError);
    expect(() => FS.null.validate(new Date())).toThrow(FS.ValidationError);
    expect(() => FS.null.validate(123)).toThrow(FS.ValidationError);
    expect(() => FS.null.validate({})).toThrow(FS.ValidationError);
    expect(() => FS.null.validate({ with: 'props' })).toThrow(FS.ValidationError);

    const result = FS.null.validate(null);
    (result: null);
    // $ExpectError
    (result: void);
    // $ExpectError
    (result: string);
    // $ExpectError
    (result: boolean);
    // $ExpectError
    (result: Date);
    // $ExpectError
    (result: number);
    // $ExpectError
    (result: {});
  });
});
