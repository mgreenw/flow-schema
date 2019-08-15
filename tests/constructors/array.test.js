// @flow

import { Flow } from '../..';

describe('Array Type', () => {
  it('should throw if the value is not an array', () => {
    expect(() => Flow.Array(Flow.any).validate(123)).toThrow(Flow.ValidationError);
    expect(() => Flow.Array(Flow.number).validate(123)).toThrow(Flow.ValidationError);
    expect(() => Flow.Array(Flow.string).validate('123')).toThrow(Flow.ValidationError);
    expect(() => Flow.Array(Flow.boolean).validate(true)).toThrow(Flow.ValidationError);
    expect(() => Flow.Array(Flow.void).validate(undefined)).toThrow(Flow.ValidationError);
    expect(() => Flow.Array(Flow.null).validate(null)).toThrow(Flow.ValidationError);
    expect(() => Flow.Array(Flow.Object({ test: Flow.number })).validate({ test: 1 })).toThrow(
      Flow.ValidationError
    );
  });

  it('should never throw if the array is empty', () => {
    expect(Flow.Array(Flow.any).validate([])).toEqual([]);
    expect(Flow.Array(Flow.number).validate([])).toEqual([]);
    expect(Flow.Array(Flow.string).validate([])).toEqual([]);
    expect(Flow.Array(Flow.boolean).validate([])).toEqual([]);
    expect(Flow.Array(Flow.void).validate([])).toEqual([]);
    expect(Flow.Array(Flow.null).validate([])).toEqual([]);
    expect(Flow.Array(Flow.Object({ test: Flow.number })).validate([])).toEqual([]);
  });

  it('should accept any type', () => {
    const schema = Flow.Array(Flow.any);

    // any[] Schema Instance
    expect(schema).toBeInstanceOf(Flow.Schema);
    (schema: Flow.Schema<any[]>);

    // any[] Validation Success
    expect(schema.validate([123])).toEqual([123]);
    (schema.validate([123]): any[]);

    // No validation - should always succeed if it's an array
  });

  it('should accept string type', () => {
    const schema = Flow.Array(Flow.string);

    // string[] Schema Instance
    expect(schema).toBeInstanceOf(Flow.Schema);
    (schema: Flow.Schema<string[]>);

    // string[] Validation Success
    expect(schema.validate(['hey', 'there'])).toEqual(['hey', 'there']);
    (schema.validate(['test']): string[]);

    // string[] Validation Error
    expect(() => schema.validate(['hello', 74393])).toThrow(Flow.ValidationError);
    expect(() => schema.validate([true])).toThrow(Flow.ValidationError);
    expect(() => schema.validate([{ cool: 'thing' }, Number.NaN, 'test'])).toThrow(
      Flow.ValidationError
    );
  });

  it('should accept boolean type', () => {
    const schema = Flow.Array(Flow.boolean);

    // boolean[] Schema Instance
    expect(schema).toBeInstanceOf(Flow.Schema);
    (schema: Flow.Schema<boolean[]>);

    // boolean[] Validation Success
    expect(schema.validate([true, false, true])).toEqual([true, false, true]);
    (schema.validate([true, false]): boolean[]);

    // boolean[] Validation Error
    expect(() => schema.validate(['hello', 74393])).toThrow(Flow.ValidationError);
    expect(() => schema.validate([true, false, true, 0])).toThrow(Flow.ValidationError);
    expect(() => schema.validate([{ cool: 'thing' }, Number.NaN, 'test'])).toThrow(
      Flow.ValidationError
    );
  });

  it('should accept number type', () => {
    const schema = Flow.Array(Flow.number);

    // number[] Schema Instance
    expect(schema).toBeInstanceOf(Flow.Schema);
    (schema: Flow.Schema<number[]>);

    // number[] Validation Success
    expect(schema.validate([1, 2, 3])).toEqual([1, 2, 3]);
    (schema.validate([1]): number[]);

    // number[] Validation Error
    expect(() => schema.validate([123, 74393, [123]])).toThrow(Flow.ValidationError);
    expect(() => schema.validate([1, 2, true, 0])).toThrow(Flow.ValidationError);
    expect(() => schema.validate([{ cool: 'thing' }, Number.NaN, 'test'])).toThrow(
      Flow.ValidationError
    );
  });

  it('should accept null type', () => {
    const schema = Flow.Array(Flow.null);

    // null[] Schema Instance
    expect(schema).toBeInstanceOf(Flow.Schema);
    (schema: Flow.Schema<null[]>);

    // null[] Validation Success
    expect(schema.validate([null, null, null, null])).toEqual([null, null, null, null]);
    (schema.validate([null, null, null]): null[]);

    // null[] Validation Error
    expect(() => schema.validate([123, 74393, [123]])).toThrow(Flow.ValidationError);
    expect(() => schema.validate([null, null, undefined])).toThrow(Flow.ValidationError);
    expect(() => schema.validate([{ cool: 'thing' }, Number.NaN, 'test'])).toThrow(
      Flow.ValidationError
    );
  });

  it('should accept void type', () => {
    const schema = Flow.Array(Flow.void);

    // void[] Schema Instance
    expect(schema).toBeInstanceOf(Flow.Schema);
    (schema: Flow.Schema<void[]>);

    // void[] Validation Success
    expect(schema.validate([undefined])).toEqual([undefined]);
    (schema.validate([undefined, undefined]): void[]);

    // void[] Validation Error
    expect(() => schema.validate([undefined, false])).toThrow(Flow.ValidationError);
    expect(() => schema.validate([undefined, 0])).toThrow(Flow.ValidationError);
    expect(() => schema.validate([{ cool: 'thing' }, Number.NaN])).toThrow(Flow.ValidationError);
  });

  it('should accept object type', () => {
    const first = Flow.Array(Flow.Object({}));
    const second = Flow.Array(Flow.Object({ test: Flow.string }));

    // object[] Schema Instance
    expect(first).toBeInstanceOf(Flow.Schema);
    (second: Flow.Schema<{ test: string }[]>);

    // object[] Validation Success
    // NOTE: Objects can have additional properties - they will get removed in validation.
    expect(first.validate([{ test: 'hey' }])).toEqual([{}]);
    (first.validate([{}, {}, {}]): {}[]);

    // object[] Validation Error
    expect(() => first.validate([undefined, false])).toThrow(Flow.ValidationError);
    expect(() => first.validate([{}, new Date()])).toThrow(Flow.ValidationError);
    expect(() => second.validate([{}])).toThrow(Flow.ValidationError);
  });

  it('should accept array<> type', () => {
    const schema = Flow.Array(Flow.Array(Flow.string));

    // Array<T>[] Schema Instance
    expect(schema).toBeInstanceOf(Flow.Schema);
    (schema: Flow.Schema<string[][]>);

    // Array<T>[] Validation Success
    expect(schema.validate([['hey', 'there'], ['test', 'reader']])).toEqual([
      ['hey', 'there'],
      ['test', 'reader'],
    ]);
    (schema.validate([['hey'], ['there']]): string[][]);

    // Array<T>[] Validation Error
    expect(() => schema.validate(['non', 'nested', 'array'])).toThrow(Flow.ValidationError);
    expect(() => schema.validate([['nested', 'and'], 'not', 'nested'])).toThrow(
      Flow.ValidationError
    );
    expect(() => schema.validate([[], [], ['just', 507, 'quite']])).toThrow(Flow.ValidationError);
  });

  it('should accept literal type', () => {
    const schema = Flow.Array(Flow.literal((10: 10)));

    // literal[] Schema Instance
    expect(schema).toBeInstanceOf(Flow.Schema);
    (schema: Flow.Schema<10[]>);

    // literal[] Validation Success
    expect(schema.validate([10, 10, 10])).toEqual([10, 10, 10]);
    (schema.validate([10]): 10[]);

    // literal[] Validation Error
    expect(() => schema.validate([9])).toThrow(Flow.ValidationError);
    expect(() => schema.validate(10)).toThrow(Flow.ValidationError);
    expect(() => schema.validate([10, 9, 10])).toThrow(Flow.ValidationError);
  });

  it('should accept intersection type', () => {
    type IntersectionSchema = Array<{ first: number } & { second: string }>;
    const schema = Flow.Array(
      Flow.intersection(Flow.Object({ first: Flow.number }), Flow.Object({ second: Flow.string }))
    );

    // intersection[] Schema Instance
    expect(schema).toBeInstanceOf(Flow.Schema);
    (schema: Flow.Schema<IntersectionSchema>);

    // intersection[] Validation Success
    const vals = [{ first: 10, second: 'a string' }, { first: Number.NaN, second: '' }];
    expect(schema.validate(vals)).toEqual(vals);
    (schema.validate(vals): IntersectionSchema);

    // intersection[] Validation Error
    expect(() => schema.validate([{ first: 10 }, { second: 'hey' }])).toThrow(Flow.ValidationError);
    expect(() => schema.validate([{ first: 10, second: 'hey' }, { second: 'hey' }])).toThrow(
      Flow.ValidationError
    );
    expect(() => schema.validate([{}, { first: 10, second: 'hey' }])).toThrow(Flow.ValidationError);
  });

  it('should accept union type', () => {
    type UnionSchema = Array<{ first: Array<string | null | number> } | number>;
    const schema = Flow.Array(
      Flow.union(
        Flow.Object({ first: Flow.Array(Flow.union(Flow.string.nullable, Flow.number)) }),
        Flow.number
      )
    );

    // union[] Schema Instance
    expect(schema).toBeInstanceOf(Flow.Schema);
    (schema: Flow.Schema<UnionSchema>);

    // union[] Validation Success
    const vals = [10, 20, 30, { first: [10, 20, 'thirty', 'fourty', null] }];
    expect(schema.validate(vals)).toEqual(vals);
    (schema.validate(vals): UnionSchema);

    // union[] Validation Error
    expect(() => schema.validate([10, 20, 30, true])).toThrow(Flow.ValidationError);
    expect(() => schema.validate([10, 20, { first: true }])).toThrow(Flow.ValidationError);
    expect(() => schema.validate([{ first: ['1', null, 10, true] }, 10])).toThrow(
      Flow.ValidationError
    );
  });

  it('should accept tuple type', () => {
    type TupleSchema = Array<[string, number, boolean, void, { test: string }]>;
    const schema = Flow.Array(
      Flow.tuple(
        Flow.string,
        Flow.number,
        Flow.boolean,
        Flow.void,
        Flow.Object({ test: Flow.string })
      )
    );

    // tuple[] Schema Instance
    expect(schema).toBeInstanceOf(Flow.Schema);
    (schema: Flow.Schema<TupleSchema>);

    // tuple[] Validation Success
    const vals = [
      ['string', -1111, false, undefined, { test: 'string' }],
      ['another string', Number.NaN, true, undefined, { test: '' }],
    ];
    expect(schema.validate(vals)).toEqual(vals);
    (schema.validate(vals): TupleSchema);

    // tuple[] Validation Error
    expect(() => schema.validate([['hey', 10, true, undefined, { test: true }]])).toThrow(
      Flow.ValidationError
    );
    expect(() =>
      schema.validate([['hey', 10, true, undefined, { test: 'true' }, 'extra']])
    ).toThrow(Flow.ValidationError);
    expect(() => schema.validate([['hey', 10, true, undefined, { test: 'true' }], null])).toThrow(
      Flow.ValidationError
    );
  });

  it('should accept map type', () => {
    type MapSchema = Array<{ [string]: string }>;
    const schema = Flow.Array(Flow.ObjectMap(Flow.string));

    // map[] Schema Instance
    expect(schema).toBeInstanceOf(Flow.Schema);
    (Flow.Array(Flow.ObjectMap(Flow.string)): Flow.Schema<MapSchema>);

    // map[] Validation Success
    const vals = [{ first: 'hey', second: 'there' }, {}, { third: 'nice' }];
    expect(schema.validate(vals)).toEqual(vals);
    (schema.validate(vals): MapSchema);

    // map[] Validation Error
    expect(() => schema.validate([{}, { test: 'str' }, 3])).toThrow(Flow.ValidationError);
    expect(() => schema.validate([{}, { test: 'str' }, { test: 2 }])).toThrow(Flow.ValidationError);
    expect(() => schema.validate([{}, { test: 'str' }, { test: 'str', test2: false }])).toThrow(
      Flow.ValidationError
    );
  });

  it('should only accept schemas, not literal values', () => {
    expect(Flow.Array(new Flow.Schema({ name: 'test', validate: value => value }))).toBeInstanceOf(
      Flow.Schema
    );

    // $ExpectError
    Flow.Array('10');
    // $ExpectError
    Flow.Array(10);
    // $ExpectError
    Flow.Array([]);
    // $ExpectError
    Flow.Array(new Date());
    // $ExpectError
    expect(() => Flow.Array(undefined)).toThrow(TypeError);
    // $ExpectError
    expect(() => Flow.Array(null)).toThrow(TypeError);
  });
});
