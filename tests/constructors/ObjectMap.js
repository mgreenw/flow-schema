// @flow

import { Flow } from '../..';

describe('Object Map Schema', () => {
  it('should only allow schemas as input', () => {
    // $ExpectError
    /*:: Flow.ObjectMap(undefined); */
    // $ExpectError
    /*:: Flow.ObjectMap(null); */
    // $ExpectError
    /*:: Flow.ObjectMap(123); */
    // $ExpectError
    /*:: Flow.ObjectMap('hey'); */
    // $ExpectError
    /*:: Flow.ObjectMap(true); */
    // $ExpectError Because a Date an ObjectMap, we call validate for Flow to realize the error here
    /*:: Flow.ObjectMap(new Date()).validate('aou'); */
    // $ExpectError Because a Date an ObjectMap, we call validate for Flow to realize the error here
    /*:: Flow.ObjectMap([1, 2]); */
    (Flow.ObjectMap(Flow.any).validate('any'): { [string]: any });
    (Flow.ObjectMap(Flow.number): { [string]: number });
    (Flow.ObjectMap(Flow.boolean): { [string]: boolean });
    (Flow.ObjectMap(Flow.string): { [string]: string });
    (Flow.ObjectMap(Flow.Date): { [string]: Date });
    (Flow.ObjectMap(Flow.Object({ property: Flow.string })): { [string]: { property: string } });
    (Flow.ObjectMap(Flow.literal<'10'>('10')): { [string]: 10 });
    (Flow.ObjectMap(Flow.null): { [string]: null });
    (Flow.ObjectMap(Flow.void): { [string]: void });
  });

  it('should fail if the value is not an object', () => {
    expect(() => Flow.ObjectMap(Flow.any).validate(true)).toThrow(Flow.ValidationError);
    expect(() => Flow.ObjectMap(Flow.any).validate(123)).toThrow(Flow.ValidationError);
    expect(() => Flow.ObjectMap(Flow.any).validate('nice')).toThrow(Flow.ValidationError);
    expect(() => Flow.ObjectMap(Flow.any).validate(undefined)).toThrow(Flow.ValidationError);
    expect(() => Flow.ObjectMap(Flow.any).validate(null)).toThrow(Flow.ValidationError);
    expect(() => Flow.ObjectMap(Flow.any).validate(new Date())).toThrow(Flow.ValidationError);
    expect(() => Flow.ObjectMap(Flow.any).validate([10, 20])).toThrow(Flow.ValidationError);
  });

  it('should always succeed on empty objects', () => {
    expect(Flow.ObjectMap(Flow.any).validate({})).toStrictEqual({});
    expect(Flow.ObjectMap(Flow.string).validate({})).toStrictEqual({});
    expect(Flow.ObjectMap(Flow.number).validate({})).toStrictEqual({});
    expect(Flow.ObjectMap(Flow.boolean).validate({})).toStrictEqual({});
    expect(Flow.ObjectMap(Flow.Date).validate({})).toStrictEqual({});
    expect(Flow.ObjectMap(Flow.literal<10>(10)).validate({})).toStrictEqual({});
    expect(Flow.ObjectMap(Flow.null).validate({})).toStrictEqual({});
    expect(Flow.ObjectMap(Flow.void).validate({})).toStrictEqual({});
    expect(Flow.ObjectMap(Flow.Object({ prop: Flow.boolean })).validate({})).toStrictEqual({});
  });

  it('should fail if any value does not match the given type', () => {
    expect(() => Flow.ObjectMap(Flow.string).validate({ good: 'string', bad: true })).toThrow(
      Flow.ValidationError
    );
    expect(() => Flow.ObjectMap(Flow.number).validate({ good: 10, bad: true })).toThrow(
      Flow.ValidationError
    );
    expect(() => Flow.ObjectMap(Flow.boolean).validate({ good: true, bad: 123 })).toThrow(
      Flow.ValidationError
    );
    expect(() => Flow.ObjectMap(Flow.Date).validate({ good: new Date(), bad: 10 })).toThrow(
      Flow.ValidationError
    );
    expect(() => Flow.ObjectMap(Flow.literal<10>(10)).validate({ good: 10, bad: 11 })).toThrow(
      Flow.ValidationError
    );
    expect(() => Flow.ObjectMap(Flow.null).validate({ good: null, bad: true })).toThrow(
      Flow.ValidationError
    );
    expect(() => Flow.ObjectMap(Flow.void).validate({ good: undefined, bad: null })).toThrow(
      Flow.ValidationError
    );
    expect(() =>
      Flow.ObjectMap(Flow.Object({ test: Flow.string })).validate({
        good: { test: 'nice' },
        bad: { test: false },
      })
    ).toThrow(Flow.ValidationError);
  });

  it('should succeed for each type', () => {
    const stringMap = { good: 'string', alsoGood: 'str' };
    expect(Flow.ObjectMap(Flow.string).validate(stringMap)).toStrictEqual(stringMap);
    const numberMap = { good: 10, alsoGood: 11 };
    expect(Flow.ObjectMap(Flow.number).validate(numberMap)).toStrictEqual(numberMap);
    const booleanMap = { good: true, alsoGood: false };
    expect(Flow.ObjectMap(Flow.boolean).validate(booleanMap)).toStrictEqual(booleanMap);
    const dateMap = { good: new Date(), alsoGood: new Date() };
    expect(Flow.ObjectMap(Flow.Date).validate(dateMap)).toStrictEqual(dateMap);
    const tenMap = { good: 10, alsoGood: 10 };
    expect(Flow.ObjectMap(Flow.literal<10>(10)).validate(tenMap)).toStrictEqual(tenMap);
    const nullMap = { good: null, alsoGood: null };
    expect(Flow.ObjectMap(Flow.null).validate(nullMap)).toStrictEqual(nullMap);
    const undefinedMap = { good: undefined, alsoGood: undefined };
    expect(Flow.ObjectMap(Flow.void).validate(undefinedMap)).toStrictEqual(undefinedMap);
    const obj = { good: { test: 'nice' }, bad: { test: false } };
    expect(Flow.ObjectMap(Flow.Object({ test: Flow.string })).validate(obj)).toStrictEqual(obj);
  });
});
