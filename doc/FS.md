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

| Type    | Schema     |
|---------|------------|
| void    | FS.void    |
| null    | FS.null    |
| string  | FS.string  |
| boolean | FS.boolean |
| number  | FS.number  |
| Date    | FS.Date    |
| any     | FS.any     |
| mixed   | FS.mixed   |

## Type Schema Constructors (by example)

_Here are the more powerful "schema constructors" that, when called, these each return a `Schema` that validates to the listed Flow equivalent._
s

| Type                  | Constructor                               |
|-----------------------|-------------------------------------------|
| {&#124; a: A, b: B &#124;}      | FS.Object({ a: Schema<A>, b: Schema<B> }) |
| Array<T>              | FS.Array(Schema<T>)                       |
| { [string]: T }       | FS.ObjectMap(Schema<T>)                   |
| A & B                 | FS.intersection(Schema<A>, Schema<B>)     |
| A | B                 | FS.union(Schema<A>, Schema<B>)            |
| $Keys<{ a: A, b: B }> | FS.$Keys({ a: Schema, b: Schema })        |
| $ReadOnly<T>          | FS.$ReadOnly(Schema<T>)                   |
| $ReadOnlyArray<T>     | FS.$ReadOnlyArray(Schema<T>)              |
| [A, B]                | FS.tuple(Schema<A>, Schema<B>)            |
| T                     | FS.literal<T>(Schema<T>)                  |