import { Meteor } from 'meteor/meteor';
import Joi from 'joi';

export default class Controller {

  /**
   * @summary Validates a value using the given schema and options where
   * @link https://github.com/hapijs/joi/blob/v10.4.1/API.md#validatevalue-schema-options-callback
   */
  static validate(obj, schema, options = {}) {
    options.abortEarly = false;
    Joi.validate(obj, schema, options, (err, value) => {
      if (err) {
        throw new Meteor.Error(422, 'Validation Failed', err.details);
      }
    });
  }

}
