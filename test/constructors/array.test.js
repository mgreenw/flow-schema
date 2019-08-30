// @flow

import FS from '../..';

describe('Array Schema', () => {
  it('should throw if the value is not an array', () => {
    expect(() => FS.Array(FS.any).validate(123)).toThrow(FS.ValidationError);
    expect(() => FS.Array(FS.number).validate(123)).toThrow(FS.ValidationError);
    expect(() => FS.Array(FS.string).validate('123')).toThrow(FS.ValidationError);
    expect(() => FS.Array(FS.boolean).validate(true)).toThrow(FS.ValidationError);
    expect(() => FS.Array(FS.void).validate(undefined)).toThrow(FS.ValidationError);
    expect(() => FS.Array(FS.null).validate(null)).toThrow(FS.ValidationError);
    expect(() => FS.Array(FS.Object({ test: FS.number })).validate({ test: 1 })).toThrow(
      FS.ValidationError
    );
  });

  it('should never throw if the array is empty', () => {
    expect(FS.Array(FS.any).validate([])).toEqual([]);
    expect(FS.Array(FS.number).validate([])).toEqual([]);
    expect(FS.Array(FS.string).validate([])).toEqual([]);
    expect(FS.Array(FS.boolean).validate([])).toEqual([]);
    expect(FS.Array(FS.void).validate([])).toEqual([]);
    expect(FS.Array(FS.null).validate([])).toEqual([]);
    expect(FS.Array(FS.Object({ test: FS.number })).validate([])).toEqual([]);
  });

  it('should accept any type', () => {
    const schema = FS.Array(FS.any);

    // any[] Schema Instance
    expect(schema).toBeInstanceOf(FS.Schema);
    (schema: FS.Schema<any[]>);

    // any[] Validation Success
    expect(schema.validate([123])).toEqual([123]);
    (schema.validate([123]): any[]);

    // No validation - should always succeed if it's an array
  });

  it('should accept string type', () => {
    const schema = FS.Array(FS.string);

    // string[] Schema Instance
    expect(schema).toBeInstanceOf(FS.Schema);
    (schema: FS.Schema<string[]>);

    // string[] Validation Success
    expect(schema.validate(['hey', 'there'])).toEqual(['hey', 'there']);
    (schema.validate(['test']): string[]);

    // string[] Validation Error
    expect(() => schema.validate(['hello', 74393])).toThrow(FS.ValidationError);
    expect(() => schema.validate([true])).toThrow(FS.ValidationError);
    expect(() => schema.validate([{ cool: 'thing' }, Number.NaN, 'test'])).toThrow(
      FS.ValidationError
    );
  });

  it('should accept boolean type', () => {
    const schema = FS.Array(FS.boolean);

    // boolean[] Schema Instance
    expect(schema).toBeInstanceOf(FS.Schema);
    (schema: FS.Schema<boolean[]>);

    // boolean[] Validation Success
    expect(schema.validate([true, false, true])).toEqual([true, false, true]);
    (schema.validate([true, false]): boolean[]);

    // boolean[] Validation Error
    expect(() => schema.validate(['hello', 74393])).toThrow(FS.ValidationError);
    expect(() => schema.validate([true, false, true, 0])).toThrow(FS.ValidationError);
    expect(() => schema.validate([{ cool: 'thing' }, Number.NaN, 'test'])).toThrow(
      FS.ValidationError
    );
  });

  it('should accept number type', () => {
    const schema = FS.Array(FS.number);

    // number[] Schema Instance
    expect(schema).toBeInstanceOf(FS.Schema);
    (schema: FS.Schema<number[]>);

    // number[] Validation Success
    expect(schema.validate([1, 2, 3])).toEqual([1, 2, 3]);
    (schema.validate([1]): number[]);

    // number[] Validation Error
    expect(() => schema.validate([123, 74393, [123]])).toThrow(FS.ValidationError);
    expect(() => schema.validate([1, 2, true, 0])).toThrow(FS.ValidationError);
    expect(() => schema.validate([{ cool: 'thing' }, Number.NaN, 'test'])).toThrow(
      FS.ValidationError
    );
  });

  it('should accept null type', () => {
    const schema = FS.Array(FS.null);

    // null[] Schema Instance
    expect(schema).toBeInstanceOf(FS.Schema);
    (schema: FS.Schema<null[]>);

    // null[] Validation Success
    expect(schema.validate([null, null, null, null])).toEqual([null, null, null, null]);
    (schema.validate([null, null, null]): null[]);

    // null[] Validation Error
    expect(() => schema.validate([123, 74393, [123]])).toThrow(FS.ValidationError);
    expect(() => schema.validate([null, null, undefined])).toThrow(FS.ValidationError);
    expect(() => schema.validate([{ cool: 'thing' }, Number.NaN, 'test'])).toThrow(
      FS.ValidationError
    );
  });

  it('should accept void type', () => {
    const schema = FS.Array(FS.void);

    // void[] Schema Instance
    expect(schema).toBeInstanceOf(FS.Schema);
    (schema: FS.Schema<void[]>);

    // void[] Validation Success
    expect(schema.validate([undefined])).toEqual([undefined]);
    (schema.validate([undefined, undefined]): void[]);

    // void[] Validation Error
    expect(() => schema.validate([undefined, false])).toThrow(FS.ValidationError);
    expect(() => schema.validate([undefined, 0])).toThrow(FS.ValidationError);
    expect(() => schema.validate([{ cool: 'thing' }, Number.NaN])).toThrow(FS.ValidationError);
  });

  it('should accept object type', () => {
    const first = FS.Array(FS.Object({}));
    const second = FS.Array(FS.Object({ test: FS.string }));

    // object[] Schema Instance
    expect(first).toBeInstanceOf(FS.Schema);
    (second: FS.Schema<{ test: string }[]>);

    // object[] Validation Success
    // NOTE: Objects can have additional properties - they will get removed in validation.
    expect(first.validate([{ test: 'hey' }])).toEqual([{}]);
    (first.validate([{}, {}, {}]): {}[]);

    // object[] Validation Error
    expect(() => first.validate([undefined, false])).toThrow(FS.ValidationError);
    expect(() => first.validate([{}, new Date()])).toThrow(FS.ValidationError);
    expect(() => second.validate([{}])).toThrow(FS.ValidationError);
  });

  it('should accept array<> type', () => {
    const schema = FS.Array(FS.Array(FS.string));

    // Array<T>[] Schema Instance
    expect(schema).toBeInstanceOf(FS.Schema);
    (schema: FS.Schema<string[][]>);

    // Array<T>[] Validation Success
    expect(schema.validate([['hey', 'there'], ['test', 'reader']])).toEqual([
      ['hey', 'there'],
      ['test', 'reader'],
    ]);
    (schema.validate([['hey'], ['there']]): string[][]);

    // Array<T>[] Validation Error
    expect(() => schema.validate(['non', 'nested', 'array'])).toThrow(FS.ValidationError);
    expect(() => schema.validate([['nested', 'and'], 'not', 'nested'])).toThrow(FS.ValidationError);
    expect(() => schema.validate([[], [], ['just', 507, 'quite']])).toThrow(FS.ValidationError);
  });

  it('should accept literal type', () => {
    const schema = FS.Array(FS.literal((10: 10)));

    // literal[] Schema Instance
    expect(schema).toBeInstanceOf(FS.Schema);
    (schema: FS.Schema<10[]>);

    // literal[] Validation Success
    expect(schema.validate([10, 10, 10])).toEqual([10, 10, 10]);
    (schema.validate([10]): 10[]);

    // literal[] Validation Error
    expect(() => schema.validate([9])).toThrow(FS.ValidationError);
    expect(() => schema.validate(10)).toThrow(FS.ValidationError);
    expect(() => schema.validate([10, 9, 10])).toThrow(FS.ValidationError);
  });

  it('should accept intersection type', () => {
    type IntersectionSchema = Array<{ first: number } & { second: string }>;
    const schema = FS.Array(
      FS.intersection(FS.Object({ first: FS.number }), FS.Object({ second: FS.string }))
    );

    // intersection[] Schema Instance
    expect(schema).toBeInstanceOf(FS.Schema);
    (schema: FS.Schema<IntersectionSchema>);

    // intersection[] Validation Success
    const vals = [{ first: 10, second: 'a string' }, { first: Number.NaN, second: '' }];
    expect(schema.validate(vals)).toEqual(vals);
    (schema.validate(vals): IntersectionSchema);

    // intersection[] Validation Error
    expect(() => schema.validate([{ first: 10 }, { second: 'hey' }])).toThrow(FS.ValidationError);
    expect(() => schema.validate([{ first: 10, second: 'hey' }, { second: 'hey' }])).toThrow(
      FS.ValidationError
    );
    expect(() => schema.validate([{}, { first: 10, second: 'hey' }])).toThrow(FS.ValidationError);
  });

  it('should accept union type', () => {
    type UnionSchema = Array<{ first: Array<string | null | number> } | number>;
    const schema = FS.Array(
      FS.union(FS.Object({ first: FS.Array(FS.union(FS.string.nullable, FS.number)) }), FS.number)
    );

    // union[] Schema Instance
    expect(schema).toBeInstanceOf(FS.Schema);
    (schema: FS.Schema<UnionSchema>);

    // union[] Validation Success
    const vals = [10, 20, 30, { first: [10, 20, 'thirty', 'fourty', null] }];
    expect(schema.validate(vals)).toEqual(vals);
    (schema.validate(vals): UnionSchema);

    // union[] Validation Error
    expect(() => schema.validate([10, 20, 30, true])).toThrow(FS.ValidationError);
    expect(() => schema.validate([10, 20, { first: true }])).toThrow(FS.ValidationError);
    expect(() => schema.validate([{ first: ['1', null, 10, true] }, 10])).toThrow(
      FS.ValidationError
    );
  });

  it('should accept tuple type', () => {
    type TupleSchema = Array<[string, number, boolean, void, { test: string }]>;
    const schema = FS.Array(
      FS.tuple(FS.string, FS.number, FS.boolean, FS.void, FS.Object({ test: FS.string }))
    );

    // tuple[] Schema Instance
    expect(schema).toBeInstanceOf(FS.Schema);
    (schema: FS.Schema<TupleSchema>);

    // tuple[] Validation Success
    const vals = [
      ['string', -1111, false, undefined, { test: 'string' }],
      ['another string', Number.NaN, true, undefined, { test: '' }],
    ];
    expect(schema.validate(vals)).toEqual(vals);
    (schema.validate(vals): TupleSchema);

    // tuple[] Validation Error
    expect(() => schema.validate([['hey', 10, true, undefined, { test: true }]])).toThrow(
      FS.ValidationError
    );
    expect(() =>
      schema.validate([['hey', 10, true, undefined, { test: 'true' }, 'extra']])
    ).toThrow(FS.ValidationError);
    expect(() => schema.validate([['hey', 10, true, undefined, { test: 'true' }], null])).toThrow(
      FS.ValidationError
    );
  });

  it('should accept map type', () => {
    type MapSchema = Array<{ [string]: string }>;
    const schema = FS.Array(FS.ObjectMap(FS.string));

    // map[] Schema Instance
    expect(schema).toBeInstanceOf(FS.Schema);
    (FS.Array(FS.ObjectMap(FS.string)): FS.Schema<MapSchema>);

    // map[] Validation Success
    const vals = [{ first: 'hey', second: 'there' }, {}, { third: 'nice' }];
    expect(schema.validate(vals)).toEqual(vals);
    (schema.validate(vals): MapSchema);

    // map[] Validation Error
    expect(() => schema.validate([{}, { test: 'str' }, 3])).toThrow(FS.ValidationError);
    expect(() => schema.validate([{}, { test: 'str' }, { test: 2 }])).toThrow(FS.ValidationError);
    expect(() => schema.validate([{}, { test: 'str' }, { test: 'str', test2: false }])).toThrow(
      FS.ValidationError
    );
  });

  it('should only accept schemas, not literal values', () => {
    expect(FS.Array(new FS.Schema({ name: 'test', validate: value => value }))).toBeInstanceOf(
      FS.Schema
    );

    // $ExpectError
    FS.Array('10');
    // $ExpectError
    FS.Array(10);
    // $ExpectError
    FS.Array([]);
    // $ExpectError
    FS.Array(new Date());
    // $ExpectError
    expect(() => FS.Array(undefined)).toThrow(TypeError);
    // $ExpectError
    expect(() => FS.Array(null)).toThrow(TypeError);
  });
});
