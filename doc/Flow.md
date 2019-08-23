# flow-schema API Documentation

```js
import { Flow } from 'flow-schema';
```

## Type Schemas

- `Flow.void` (`void`)
- `Flow.null` (`null`)
- `Flow.string` (`string`)
- `Flow.boolean` (`boolean`)
- `Flow.number` (`number`)
- `Flow.Date` (`Date`)
- `Flow.any` (`any`)
- `Flow.mixed` (`mixed`)

## Type Schema Constructors (by example)

- `Flow.Object(schemas: { keyOne: Schema<A>, keyTwo: Schema<B>, ... })` (`{ { keyOne: A, keyTwo: B, ... } }`)
- `Flow.Array(Schema<T>)` (`T[]`)
- `Flow.ObjectMap(Schema<T>)` (`{ [string]: T }`)
- `Flow.intersection(Schema<A>, Schema<B>, Schema<C>, ...)` (`A & B & C & ...`)
- `Flow.union(Schema<A>, Schema<B>, Schema<C>, ...)` (`A | B | C | ...`)
- `Flow.$Keys({ keyOne: 'one', keyTwo: 'two' })` (`'one' | 'two'`)
- `Flow.$ReadOnly(Schema<T>)` (`$ReadOnly<T>`)
- `Flow.$ReadOnlyArray(Schema<T>)` (`$ReadOnlyArray<T>`)
- `Flow.tuple(Schema<A>, Schema<B>, Schema<C>, ...)` (`[A, B, C, ...]`)
- `Flow.literal<V>(V)` (`V`)
-
