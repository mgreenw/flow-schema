// @flow

import FS from '../..';

describe('Object Schema', () => {
  it('should not pass Flow in the input is not an object', () => {
    // $ExpectError
    /*:: FS.Object(undefined); */
    // $ExpectError
    /*:: FS.Object(null); */
    // $ExpectError
    /*:: FS.Object(123); */
    // $ExpectError
    /*:: FS.Object('hey'); */
    // $ExpectError
    /*:: FS.Object(true); */
    // $ExpectError Because a Date an Object, we call validate for Flow to realize the error here
    /*:: FS.Object(new Date()).validate('aou'); */
    // $ExpectError
    /*:: FS.Object([1, 2]); */
    // $ExpectError
    /*:: FS.Object(FS.number).validate('nice'); */
    // $ExpectError
    /*:: FS.Object(FS.Object({ test: FS.number })).validate('bad'); */
  });

  it('should succeed for an empty object', () => {
    expect(FS.Object({}).validate({})).toStrictEqual({});
  });

  it('validate an object with properties of many types', () => {
    const ObjectSchema = FS.Object({
      boolean: FS.boolean,
      number: FS.number,
      string: FS.string,
      undefined: FS.void,
      null: FS.null,
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
    const ObjectSchema = FS.Object({
      boolean: FS.boolean,
      number: FS.number,
      string: FS.string,
      undefined: FS.void,
      null: FS.null,
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
      these: FS.any,
      properties: FS.number,
      should: FS.string,
      be: FS.Object({ removed: FS.string }),
    };

    const result = ObjectSchema.validate(valuePlus);
    expect(result).toStrictEqual(value);
    (result: {| boolean: boolean, number: number, string: string, undefined: void, null: null |});
  });

  it('should properly validate nested objects', () => {
    const ObjectSchema = FS.Object({
      boolean: FS.boolean,
      obj: FS.Object({
        number: FS.number,
        string: FS.literal<'hey'>('hey'),
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
    const ObjectSchema = FS.Object({
      boolean: FS.boolean,
      obj: FS.Object({
        number: FS.number,
        string: FS.literal<'hey'>('hey'),
      }),
    });

    const value = {
      boolean: 'not a boolean',
      obj: {
        number: 123,
        string: 'hey',
      },
    };

    expect(() => ObjectSchema.validate(value)).toThrow(FS.ValidationError);
  });
});
