It uses [poppinss/indicative](https://github.com/poppinss/indicative) in under the hood. indicative does not provide any configuration chance for default error messages. And also it does not provide to change attributes. So, I just wrap it and made it configurable.

There was a feature request about it but maintainer of indicative declined it. [This issue: #59](https://github.com/poppinss/indicative/issues/59) Maintainer said "you can wrap and configure it". I did it but I don't want to copy the wrapper code in every project. That's why I published it as a npm package.

Finally, I need to say last thing, I like "indicative" package so much. Thanks to maintainer of that package! I hope the maintainer will add configuration to built in feature!

## Installation

```sh
npm install @selahattinunlu/node-validator -S
```

## Usage

### Configuration
You can configure default message and default attributes by passing options parameters while initialize it

```js
const Validator = require('@selahattinunlu/node-validator');

const validator = new Validator({
  messages: {
     require: '{{ field }} is required.',
     email: 'Please enter a valid email',
  },
  attributes: {
    email: 'Email',
  }
});
```

or you can set default messages and default attributes using setter functions.

```js
const Validator = require('@selahattinunlu/node-validator');

const validator = new Validator();

validator.setDefaultMessages({
  //
});

validator.setDefaultAttributes({
  //
});

```

### Validation

```js
const Validator = require('@selahattinunlu/node-validator');

const validator = new Validator();

const exampleData = {
   name: 'Selahattin'
};

const options = {
  messages: {
    required: 'This field is required.',
  },
  attributes: {
    name: 'Name'
  }
}

validator
  .validate(exampleData, {
    name: 'required',
    email: 'required|email',
  }, options)
  .then(() => console.log('everything is okay!'))
  .catch(errors => console.log(errors));
```

### Validation Rules

As I said before, this package uses [poppinss/indicative](https://github.com/poppinss/indicative) in under the hood. So you need to check that package's documenatation to learn all rules. Please [click here](https://indicative.adonisjs.com/) to access documentation.
