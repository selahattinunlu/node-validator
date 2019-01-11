const Validator = require('./index.js');

const validator = new Validator();

const exampleData = {
  name: 'Selahattin',
};

// basic example
(async () => {
  try {
    await validator.validate(exampleData, {
      name: 'required',
      age: 'required'
    }, {
      attributes: {
        age: 'Age'
      }
    });
  } catch (errors) {
    console.log(errors);
  }
})();
// =============================

// set default messages and attributes using constructor parameter
const anotherValidator = new Validator({
  attributes: {
    age: 'This age field',
  },
  messages: {
    required: 'Please enter a valid value for {{ field }}'
  }
});

(async () => {
  try {
    await anotherValidator.validate(exampleData, {
      name: 'required',
      age: 'required'
    });
  } catch (errors) {
    console.log(errors);
  }
})();


// set default messages using set functions and attributes example
validator.setDefaultAttributes({
  age: 'Age field'
});

validator.setDefaultMessages({
  required: '{{ field }} is required, please enter a valid value!'
});

(async () => {
  try {
    await validator.validate(exampleData, {
      name: 'required',
      age: 'required'
    });
  } catch (errors) {
    console.log(errors);
  }
})();
