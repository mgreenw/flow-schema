// @flow

import FS from '../..';

describe('Object Map Schema', () => {
  it('should only allow schemas as input', () => {
    // $ExpectError
    /*:: FS.ObjectMap(undefined); */
    // $ExpectError
    /*:: FS.ObjectMap(null); */
    // $ExpectError
    /*:: FS.ObjectMap(123); */
    // $ExpectError
    /*:: FS.ObjectMap('hey'); */
    // $ExpectError
    /*:: FS.ObjectMap(true); */
    // $ExpectError Because a Date an ObjectMap, we call validate for Flow to realize the error here
    /*:: FS.ObjectMap(new Date()).validate('aou'); */
    // $ExpectError Because a Date an ObjectMap, we call validate for Flow to realize the error here
    /*:: FS.ObjectMap([1, 2]); */
    (FS.ObjectMap(FS.any).validate('any'): { [string]: any });
    (FS.ObjectMap(FS.number): { [string]: number });
    (FS.ObjectMap(FS.boolean): { [string]: boolean });
    (FS.ObjectMap(FS.string): { [string]: string });
    (FS.ObjectMap(FS.Date): { [string]: Date });
    (FS.ObjectMap(FS.Object({ property: FS.string })): { [string]: { property: string } });
    (FS.ObjectMap(FS.literal<'10'>('10')): { [string]: 10 });
    (FS.ObjectMap(FS.null): { [string]: null });
    (FS.ObjectMap(FS.void): { [string]: void });
  });

  it('should fail if the value is not an object', () => {
    expect(() => FS.ObjectMap(FS.any).validate(true)).toThrow(FS.ValidationError);
    expect(() => FS.ObjectMap(FS.any).validate(123)).toThrow(FS.ValidationError);
    expect(() => FS.ObjectMap(FS.any).validate('nice')).toThrow(FS.ValidationError);
    expect(() => FS.ObjectMap(FS.any).validate(undefined)).toThrow(FS.ValidationError);
    expect(() => FS.ObjectMap(FS.any).validate(null)).toThrow(FS.ValidationError);
    expect(() => FS.ObjectMap(FS.any).validate(new Date())).toThrow(FS.ValidationError);
    expect(() => FS.ObjectMap(FS.any).validate([10, 20])).toThrow(FS.ValidationError);
  });

  it('should always succeed on empty objects', () => {
    expect(FS.ObjectMap(FS.any).validate({})).toStrictEqual({});
    expect(FS.ObjectMap(FS.string).validate({})).toStrictEqual({});
    expect(FS.ObjectMap(FS.number).validate({})).toStrictEqual({});
    expect(FS.ObjectMap(FS.boolean).validate({})).toStrictEqual({});
    expect(FS.ObjectMap(FS.Date).validate({})).toStrictEqual({});
    expect(FS.ObjectMap(FS.literal<10>(10)).validate({})).toStrictEqual({});
    expect(FS.ObjectMap(FS.null).validate({})).toStrictEqual({});
    expect(FS.ObjectMap(FS.void).validate({})).toStrictEqual({});
    expect(FS.ObjectMap(FS.Object({ prop: FS.boolean })).validate({})).toStrictEqual({});
  });

  it('should fail if any value does not match the given type', () => {
    expect(() => FS.ObjectMap(FS.string).validate({ good: 'string', bad: true })).toThrow(
      FS.ValidationError
    );
    expect(() => FS.ObjectMap(FS.number).validate({ good: 10, bad: true })).toThrow(
      FS.ValidationError
    );
    expect(() => FS.ObjectMap(FS.boolean).validate({ good: true, bad: 123 })).toThrow(
      FS.ValidationError
    );
    expect(() => FS.ObjectMap(FS.Date).validate({ good: new Date(), bad: 10 })).toThrow(
      FS.ValidationError
    );
    expect(() => FS.ObjectMap(FS.literal<10>(10)).validate({ good: 10, bad: 11 })).toThrow(
      FS.ValidationError
    );
    expect(() => FS.ObjectMap(FS.null).validate({ good: null, bad: true })).toThrow(
      FS.ValidationError
    );
    expect(() => FS.ObjectMap(FS.void).validate({ good: undefined, bad: null })).toThrow(
      FS.ValidationError
    );
    expect(() =>
      FS.ObjectMap(FS.Object({ test: FS.string })).validate({
        good: { test: 'nice' },
        bad: { test: false },
      })
    ).toThrow(FS.ValidationError);
  });

  it('should succeed for each type', () => {
    const stringMap = { good: 'string', alsoGood: 'str' };
    expect(FS.ObjectMap(FS.string).validate(stringMap)).toStrictEqual(stringMap);
    const numberMap = { good: 10, alsoGood: 11 };
    expect(FS.ObjectMap(FS.number).validate(numberMap)).toStrictEqual(numberMap);
    const booleanMap = { good: true, alsoGood: false };
    expect(FS.ObjectMap(FS.boolean).validate(booleanMap)).toStrictEqual(booleanMap);
    const dateMap = { good: new Date(), alsoGood: new Date() };
    expect(FS.ObjectMap(FS.Date).validate(dateMap)).toStrictEqual(dateMap);
    const tenMap = { good: 10, alsoGood: 10 };
    expect(FS.ObjectMap(FS.literal<10>(10)).validate(tenMap)).toStrictEqual(tenMap);
    const nullMap = { good: null, alsoGood: null };
    expect(FS.ObjectMap(FS.null).validate(nullMap)).toStrictEqual(nullMap);
    const undefinedMap = { good: undefined, alsoGood: undefined };
    expect(FS.ObjectMap(FS.void).validate(undefinedMap)).toStrictEqual(undefinedMap);
    const obj = { good: { test: 'nice' }, bad: { test: false } };
    expect(FS.ObjectMap(FS.Object({ test: FS.string })).validate(obj)).toStrictEqual(obj);
  });
});
