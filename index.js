const { validate } = require('indicative');

class Validator {
  constructor(options = {}) {
    this.defaultMessages = {
      required: '{{ field }} is required.'
    };

    this.defaultAttributes = {
      //
    };

    if ('messages' in options) {
      this.setDefaultMessages(options.messages);
    }

    if ('attributes' in options) {
      this.setDefaultAttributes(options.attributes);
    }
  }

  setDefaultMessages(messages) {
    this.defaultMessages = Object.assign(
      this.defaultMessages,
      messages
    );
  }

  setDefaultAttributes(attributes) {
    this.defaultAttributes = Object.assign(
      this.defaultAttributes,
      attributes
    );
  }

  async validate(data, rules, options = {}) {
    let customMessages = Object.assign({}, this.defaultMessages);
    let customAttributes = Object.assign({}, this.defaultAttributes);

    if ('messages' in options) {
      customMessages = Object.assign(customMessages, options.messages);
    }

    if ('attributes' in options) {
      customAttributes = Object.assign(customAttributes, options.attributes);
    }

    try {
      await validate(data, rules, customMessages);
      return Promise.resolve(true);
    } catch (errors) {
      const attributeKeys = Object.keys(customAttributes);

      if (attributeKeys.length > 0) {
        errors.forEach((error) => {
          const { field } = error;

          if (attributeKeys.indexOf(field) !== -1) {
            error.message = error.message.replace(field, customAttributes[field]);
          }
        });
      }

      return Promise.reject(errors);
    }
  }
};

module.exports = Validator;
