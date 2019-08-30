// @flow

import FS from '../..';

describe('Literal Schema', () => {
  it('should only allow strings, booleans, and numbers', () => {
    FS.literal(true);
    FS.literal(123);
    FS.literal('test string');
    // $ExpectError
    /*:: FS.literal(null); */
    // $ExpectError
    /*:: FS.literal(undefined); */
    // $ExpectError
    /*:: FS.literal({}); */
    // $ExpectError
    /*:: FS.literal({ object: 'with properties' }); */
    // $ExpectError
    /*:: FS.literal(new Date()); */
    // $ExpectError
    /*:: FS.literal([1, 2, 'three']); */
    // $ExpectError
    /*:: FS.literal(FS.literal(10)); */
    // $ExpectError
    /*:: FS.literal(FS.number); */
    // $ExpectError
    /*:: FS.literal(FS.Object({ literal: FS.boolean })); */
  });

  it('should infer the proper return type', () => {
    (FS.literal<true>(true).validate(true): true);
    (FS.literal<123>(123).validate(123): 123);
    (FS.literal<'test string'>('test string').validate('test string'): 'test string');
  });

  it('should properly validate literal values', () => {
    expect(FS.literal<true>(true).validate(true)).toBe(true);
    expect(FS.literal<123>(123).validate(123)).toBe(123);
    expect(FS.literal<'test string'>('test string').validate('test string')).toBe('test string');
  });

  it('should throw an error if the values are not equal to that literal', () => {
    expect(() => FS.literal<true>(true).validate(false)).toThrow(FS.ValidationError);
    expect(() => FS.literal<123>(123).validate(124)).toThrow(FS.ValidationError);
    expect(() => FS.literal<'test'>('test').validate('tester')).toThrow(FS.ValidationError);

    expect(() => FS.literal<true>(true).validate(123)).toThrow(FS.ValidationError);
    expect(() => FS.literal<123>(123).validate(true)).toThrow(FS.ValidationError);
    expect(() => FS.literal<'test'>('test').validate(true)).toThrow(FS.ValidationError);
  });
});
