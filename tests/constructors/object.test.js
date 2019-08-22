// @flow

import { Flow } from '../..';

describe('Object Schema', () => {
  it('should not pass Flow in the input is not an object', () => {
    // $ExpectError
    /*:: Flow.Object(undefined); */
    // $ExpectError
    /*:: Flow.Object(null); */
    // $ExpectError
    /*:: Flow.Object(123); */
    // $ExpectError
    /*:: Flow.Object('hey'); */
    // $ExpectError
    /*:: Flow.Object(true); */
    // $ExpectError Because a Date an Object, we call validate for Flow to realize the error here
    /*:: Flow.Object(new Date()).validate('aou'); */
    // $ExpectError Because a Date an Object, we call validate for Flow to realize the error here
    /*:: Flow.Object([1, 2]); */
  });

  it('should succeed for an empty object', () => {
    expect(Flow.Object({}).validate({})).toStrictEqual({});
  });

  it('validate an object with properties of many types', () => {
    const ObjectSchema = Flow.Object({
      boolean: Flow.boolean,
      number: Flow.number,
      string: Flow.string,
      undefined: Flow.void,
      null: Flow.null,
    });

    const value = {
      boolean: true,
      number: 123,
      string: 'hey there!',
      undefined: undefined,
      null: null,
    };

    const result = ObjectSchema.validate(value);
    expect(result).toStrictEqual(value);
    (result: {| boolean: boolean, number: number, string: string, undefined: void, null: null |});
  });

  it('should remove additional properties from the value', () => {
    const ObjectSchema = Flow.Object({
      boolean: Flow.boolean,
      number: Flow.number,
      string: Flow.string,
      undefined: Flow.void,
      null: Flow.null,
    });

    const value = {
      boolean: true,
      number: 123,
      string: 'hey there!',
      undefined: undefined,
      null: null,
    };

    const valuePlus = {
      ...value,
      // These properties should be removed
      these: Flow.any,
      properties: Flow.number,
      should: Flow.string,
      be: Flow.Object({ removed: Flow.string }),
    };

    const result = ObjectSchema.validate(valuePlus);
    expect(result).toStrictEqual(value);
    (result: {| boolean: boolean, number: number, string: string, undefined: void, null: null |});
  });

  it('should properly validate nested objects', () => {
    const ObjectSchema = Flow.Object({
      boolean: Flow.boolean,
      obj: Flow.Object({
        number: Flow.number,
        string: Flow.literal<'hey'>('hey'),
      }),
    });

    const value = {
      boolean: true,
      obj: {
        number: 123,
        string: 'hey',
      },
    };

    const result = ObjectSchema.validate(value);
    expect(result).toStrictEqual(value);
    (result: {| boolean: boolean, obj: {| number: number, string: 'hey' |} |});
  });

  it('should fail validation if properties do not match their expected type', () => {
    const ObjectSchema = Flow.Object({
      boolean: Flow.boolean,
      obj: Flow.Object({
        number: Flow.number,
        string: Flow.literal<'hey'>('hey'),
      }),
    });

    const value = {
      boolean: 'not a boolean',
      obj: {
        number: 123,
        string: 'hey',
      },
    };

    expect(() => ObjectSchema.validate(value)).toThrow(Flow.ValidationError);
  });
});
