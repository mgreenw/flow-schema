# API Documentation

_NOTE_: These docs are still a work in progress.

```js
import FS from 'flow-schema';
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

- `FS.void` (`void`)
- `FS.null` (`null`)
- `FS.string` (`string`)
- `FS.boolean` (`boolean`)
- `FS.number` (`number`)
- `FS.Date` (`Date`)
- `FS.any` (`any`)
- `FS.mixed` (`mixed`)

## Type Schema Constructors (by example)

_Here are the more powerful "schema constructors" that, when called, these each return a `Schema` that validates to the listed Flow equivalent._
s

- `FS.Object(schemas: { keyOne: Schema<A>, keyTwo: Schema<B>, ... })` (`{ { keyOne: A, keyTwo: B, ... } }`)
- `FS.Array(Schema<T>)` (`T[]`)
- `FS.ObjectMap(Schema<T>)` (`{ [string]: T }`)
- `FS.intersection(Schema<A>, Schema<B>, Schema<C>, ...)` (`A & B & C & ...`)
- `FS.union(Schema<A>, Schema<B>, Schema<C>, ...)` (`A | B | C | ...`)
- `FS.$Keys({ keyOne: 'one', keyTwo: 'two' })` (`'one' | 'two'`)
- `FS.$ReadOnly(Schema<T>)` (`$ReadOnly<T>`)
- `FS.$ReadOnlyArray(Schema<T>)` (`$ReadOnlyArray<T>`)
- `FS.tuple(Schema<A>, Schema<B>, Schema<C>, ...)` (`[A, B, C, ...]`)
- `FS.literal<V>(V)` (`V`)
