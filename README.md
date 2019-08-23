# Flow Schema

Flow Schema is a fast runtime schema validation library for [Flow](https://flow.org).

## API

WIP.

## Motivation

Javascript excels at interacting with external datas sources (APIs, Databases, files, etc). However, validating incoming data that is `any` typed challenges our type system. Instead of using a value blindly, we want to validate that a value is typed as we expect.

Although there are plenty of Javascript object schema validation libraries like [Joi](https://github.com/hapijs/joi) and [ajv](https://github.com/epoberezkin/ajv), most do not validate objects to their proper [Flow](https://flow.org) type.

Flow Schema provides a simple API to construct type schemas that can be used to synchronously validate the types of untrusted objects to their proper [Flow](https://flow.org) type. If validation fails, Flow Schema will throw a `ValidationError` with a descriptive error message. This allows Flow Schema to be used in a `try {} catch (error) {}` block

## Example

### Simple

```javascript
// Success
const success = Flow.string.validate('success');

// Error
const oops = Flow.string.validate(123);

/*
  Error: ValidationError

  Expected: string
  Received: 123 (Number)
*/
```

### Advanced

```javascript
// @flow

import { Flow } from 'flow-schema';

// Define Login type and schema
type Login =
  | string
  | {
      ip: string,
      attempt: number | null,
    };

const LoginSchema = Flow.union(
  Flow.string,
  Flow.Object({
    ip: Flow.string,
    attempt: Flow.number.nullable,
  })
);

// Define User type and schema
type User = {
  name: string,
  birthday: Date,
  email: string,
  logins: Array<Login>,
};

const UserSchema = Flow.Object({
  name: Flow.string,
  birthday: Flow.Date,
  email: Flow.string,
  logins: Flow.Array(LoginSchema),
});

// Get some API Data
const apiJSON = '{"name":"Charlie","birthday":"1970-01-01T00:00:00.000Z","email":"charlie.bucket@wonka.net","logins":["192.168.1.0",{"ip":"8.8.8.8","attempt":null},{"ip":"8.8.4.4","attempt":2}]}';
const apiData = JSON.parse(apiJSON);

try {
  // Validate the apiData
  const user = UserSchema.validate(apiData);

  // Use the data with confidence
  (user: User);
} catch (error) {
  // Rethrow if the error is not a ValidationError
  if (!(error instanceof Flow.ValidationError)) throw error;

  // Handle the Validation Error
  Sentry.catchException(new Error('This was not suppossed to happen'));
}
```
