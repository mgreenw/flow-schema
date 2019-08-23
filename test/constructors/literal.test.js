// @flow

import { Flow } from '../..';

describe('Literal Schema', () => {
  it('should only allow strings, booleans, and numbers', () => {
    Flow.literal(true);
    Flow.literal(123);
    Flow.literal('test string');
    // $ExpectError
    /*:: Flow.literal(null); */
    // $ExpectError
    /*:: Flow.literal(undefined); */
    // $ExpectError
    /*:: Flow.literal({}); */
    // $ExpectError
    /*:: Flow.literal({ object: 'with properties' }); */
    // $ExpectError
    /*:: Flow.literal(new Date()); */
    // $ExpectError
    /*:: Flow.literal([1, 2, 'three']); */
    // $ExpectError
    /*:: Flow.literal(Flow.literal(10)); */
    // $ExpectError
    /*:: Flow.literal(Flow.number); */
    // $ExpectError
    /*:: Flow.literal(Flow.Object({ literal: Flow.boolean })); */
  });

  it('should infer the proper return type', () => {
    (Flow.literal<true>(true).validate(true): true);
    (Flow.literal<123>(123).validate(123): 123);
    (Flow.literal<'test string'>('test string').validate('test string'): 'test string');
  });

  it('should properly validate literal values', () => {
    expect(Flow.literal<true>(true).validate(true)).toBe(true);
    expect(Flow.literal<123>(123).validate(123)).toBe(123);
    expect(Flow.literal<'test string'>('test string').validate('test string')).toBe('test string');
  });

  it('should throw an error if the values are not equal to that literal', () => {
    expect(() => Flow.literal<true>(true).validate(false)).toThrow(Flow.ValidationError);
    expect(() => Flow.literal<123>(123).validate(124)).toThrow(Flow.ValidationError);
    expect(() => Flow.literal<'test'>('test').validate('tester')).toThrow(Flow.ValidationError);

    expect(() => Flow.literal<true>(true).validate(123)).toThrow(Flow.ValidationError);
    expect(() => Flow.literal<123>(123).validate(true)).toThrow(Flow.ValidationError);
    expect(() => Flow.literal<'test'>('test').validate(true)).toThrow(Flow.ValidationError);
  });
});
