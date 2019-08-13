// @flow

import { Schema } from '../Schema';

export const any: Schema<any> = new Schema('any', value => value);
