# API Documentation

_NOTE_: These docs are still a work in progress.

```js
import { Flow } from 'flow-schema';
```

## Schema

A `Schema<T>` is the main object class in `flow-schema`. A `Schema<T>` has the following methods/properties:

- `validate(value: mixed): T`
- `get optional(): Schema<T | void>`
- `get nullable(): Schema<T | null>`
- `get maybe(): Schema<T | null | void>`
- `get nonMaybe(): Schema<$NonMaybeType<T>>`

## Base Type Schemas

_Here are the base type schemas and their Flow equivalent._

- `Flow.void` (`void`)
- `Flow.null` (`null`)
- `Flow.string` (`string`)
- `Flow.boolean` (`boolean`)
- `Flow.number` (`number`)
- `Flow.Date` (`Date`)
- `Flow.any` (`any`)
- `Flow.mixed` (`mixed`)

## Type Schema Constructors (by example)

_Here are the more powerful "schema constructors" that, when called, these each return a `Schema` that validates to the listed Flow equivalent._

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
