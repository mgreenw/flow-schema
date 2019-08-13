// @flow

import { Context } from './Context';

export class ValidationError extends Error {
  contexts: Context<mixed>[];
  // Reasons are a list of human readable issues with the expecetd type. Usually
  // they will be a list of constraints that have been violated that are not
  // necessarily specific to the type but to the constraints added to the type.
  reasons: string[];

  constructor(reasons: string[] = []) {
    super();

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }

    // Custom debugging information
    this.contexts = [];
    this.reasons = reasons;
  }

  // Allow adding a context after the error is created. This should only be
  // used by a Schema to add context to an already caught error.
  addContext(context: Context<mixed>) {
    this.contexts.push(context);
  }

  /*
    Validation Context
      This is the context in which the validate() function was initially called.
      The schema represents the outermost schema, and the value is the value
      passed into the validate() function.
  */

  get validationContext() {
    return this.contexts[this.contexts.length - 1];
  }

  get errorContext() {
    return this.contexts[0];
  }

  get propertyName(): string | null {
    const context = this.contexts.find(context => context.propertyName);
    return context ? context.propertyName : null;
  }

  get valueConstructorString(): string {
    return this.validationContext.valueConstructor
      ? `(${this.validationContext.valueConstructor})`
      : '';
  }

  get reasonsMessage(): string | null {
    if (this.reasons.length === 0) return null;

    // Generate a list of reasons using the `-  element` format
    const reasonsList = this.reasons.map(reason => `-  ${reason}`).join('\n');
    return `Violated Constraints (${this.reasons.length}):\n${reasonsList}`;
  }

  get contextMessage(): string | null {
    if (!this.propertyName) return null;
    return `${this.errorContext.valueString}\n  does not match type\n${
      this.errorContext.schema.name
    }${`\n  in property\n${this.propertyName || '<unknown>'}`}`;
  }

  set message(newMessage: string) {
    throw new Error("ValidationError's message is not writable.");
  }

  get message() {
    const additionalMessages = [this.contextMessage, this.reasonsMessage].filter(m => m);

    return `ValidationError

Expected: ${this.validationContext.expectedType}
Received: ${this.validationContext.valueString} ${this.valueConstructorString}

${additionalMessages.join('\n\n')}
`;
  }
}
