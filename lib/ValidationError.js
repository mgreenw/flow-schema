// @flow

import { Context } from './Context';
import { type Constraint } from './Constraint';

export class ValidationError extends Error {
  contexts: Context<mixed>[];
  violatedConstraints: Constraint<mixed>[];

  /**
   * An Error with a flow-schema validation message.
   * @param {Constraint<mixed>[]} violatedConstraints - A list of human readable issues with
   *                                                    the expected type.
   */
  constructor(violatedConstraints: Constraint<mixed>[] = []) {
    super();
    this.contexts = [];
    this.violatedConstraints = violatedConstraints;

    // Capture the stack trace if possible
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }

  /**
   * Add additional context to the ValidationError. This should only be used by a Schema
   * @param {Context<mixed>} context - The context to add to the ValidationError
   */
  addContext(context: Context<mixed>) {
    this.contexts.push(context);
  }

  /**
   * The context in which the validate() function was called.
   * @type {Context<mixed>}
   */
  get validationContext() {
    return this.contexts[this.contexts.length - 1];
  }

  /**
   * The context in which the ValidationError occurred.
   * @type {Context<mixed>}
   */
  get errorContext() {
    return this.contexts[0];
  }

  /**
   * The property name of the value that failed validation. This will always be supplied in Objects
   * @type {string | null}
   */
  get propertyName(): string | null {
    const context = this.contexts.find(context => context.propertyName);
    return context ? context.propertyName : null;
  }

  /**
   * The message fragment that contains the descriptions of the violated constraints
   * @type {string | null}
   */
  get violatedConstraintsMessage(): string | null {
    if (this.violatedConstraints.length === 0) return null;

    // Generate a list of violatedConstraints using the `-  element` format
    const violatedConstraintsList = this.violatedConstraints
      .map(constraint => `-  ${constraint.description}`)
      .join('\n');
    return `Violated Constraints (${this.violatedConstraints.length}):\n${violatedConstraintsList}`;
  }

  /**
   * The message fragment that contains the description of the error in the error/property context
   * @type {string | null}
   */
  get propertyErrorMessage(): string | null {
    if (!this.propertyName) return null;
    return `${this.errorContext.valueString}\n  does not match type\n${
      this.errorContext.schema.name
    }${`\n  in property\n${this.propertyName || '<unknown>'}`}`;
  }

  /**
   * The constructed ValidationError message
   * @type {string | null}
   */
  get message() {
    const contextAndReasons = [this.propertyErrorMessage, this.violatedConstraintsMessage].filter(
      message => message
    );
    const valueConstructor = this.validationContext.valueConstructor
      ? `(${this.validationContext.valueConstructor})`
      : '';

    return `ValidationError\n\nExpected: ${this.validationContext.expectedType}\nReceived: ${
      this.validationContext.valueString
    } ${valueConstructor}\n\n${contextAndReasons.join('\n\n')}\n`;
  }

  /**
   * @throws Cannot be modified
   */
  set message(newMessage: string) {
    throw new Error("ValidationError's message is not writable.");
  }
}
