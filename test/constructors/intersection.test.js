// @flow

import { Flow } from '../..';

describe('Intersection Schema', () => {
  // It should not accept non-schema values
  it('should not pass Flow if a non-Schema is passed in', () => {
    // $ExpectError
    /*:: Flow.intersection(1); */
    // $ExpectError
    /*:: Flow.intersection(true); */
    // $ExpectError
    /*:: Flow.intersection('string'); */
    // $ExpectError
    /*:: Flow.intersection(null); */
    // $ExpectError
    /*:: Flow.intersection(undefined); */
    // $ExpectError
    /*:: Flow.intersection(['one', 'two']); */
    // $ExpectError
    /*:: Flow.intersection(new Date()); */
    // $ExpectError
    /*:: Flow.intersection(1, 2, 'three'); */
  });

  it('should properly flow type intersections', () => {
    (Flow.intersection(Flow.number).validate(10): number);
    // This can't happen but it technically allowed in flow.
    /*:: (Flow.intersection(Flow.number, Flow.string).validate(10): number & string); */
    (Flow.intersection(
      Flow.Object({ string: Flow.string }),
      Flow.Object({ number: Flow.number })
    ).validate({ string: 'string', number: 10 }): { string: string, number: number });
  });

  it('should fail if the intersection is impossible', () => {
    expect(() => Flow.intersection(Flow.number, Flow.string).validate(10)).toThrow(
      Flow.ValidationError
    );
    expect(() => Flow.intersection(Flow.number, Flow.null).validate(null)).toThrow(
      Flow.ValidationError
    );
    expect(() =>
      Flow.intersection(
        Flow.Object({ test: Flow.string }),
        Flow.Object({ test: Flow.number })
      ).validate({ test: 'string' })
    ).toThrow(Flow.ValidationError);
  });

  it('should fail if the value passed in does not match the intersection', () => {
    expect(() => Flow.intersection(Flow.number).validate(true)).toThrow(Flow.ValidationError);
    expect(() => Flow.intersection(Flow.null).validate('10')).toThrow(Flow.ValidationError);
    expect(() =>
      Flow.intersection(
        Flow.Object({ string: Flow.string }),
        Flow.Object({ number: Flow.number })
      ).validate({ string: 'string' })
    ).toThrow(Flow.ValidationError);
    expect(() =>
      Flow.intersection(
        Flow.Object({ string: Flow.string }),
        Flow.Object({ number: Flow.number }),
        Flow.Object({
          obj: Flow.Object({
            test: Flow.void,
          }),
        })
      ).validate({ string: 'string', number: 10, obj: { test: Flow.string } })
    ).toThrow(Flow.ValidationError);
  });

  it('should succeed if the value passed in matches the defined intersection', () => {
    expect(Flow.intersection(Flow.number).validate(10)).toStrictEqual(10);
    expect(Flow.intersection(Flow.null).validate(null)).toStrictEqual(null);
    expect(
      Flow.intersection(
        Flow.Object({ string: Flow.string }),
        Flow.Object({ number: Flow.number })
      ).validate({ string: 'string', number: 10 })
    ).toStrictEqual({ string: 'string', number: 10 });
    expect(
      Flow.intersection(
        Flow.Object({ string: Flow.string }),
        Flow.Object({ number: Flow.number }),
        Flow.Object({
          obj: Flow.Object({
            test: Flow.null,
          }),
        })
      ).validate({ string: 'string', number: 10, obj: { test: null } })
    ).toStrictEqual({ string: 'string', number: 10, obj: { test: null } });
  });
});
