export const validationTypes = {
  isRequired: "isRequired",
  arrayNotEmpty: "arrayNotEmpty",
  invalidCredentials: "invalidCredentials",
  isValidEmail: "isValidEmail"
};

export class validatorSrvc {
  static validateItems(validationItems) {
    const errors = {};

    for (let key in validationItems) {
      if (validationItems.hasOwnProperty(key)) {
        const item = validationItems[key];
        const error = this.validate(item.value, item.validators);

        if (error) {
          errors[key] = error;
        }
      }
    }

    return errors;
  }

  static validate(value, validators) {
    for (let i = 0; i < validators.length; i++) {
      if (!this[validators[i]](value)) {
        return validationTypes[validators[i]];
      }
    }

    return null;
  }

  static isRequired(value) {
    return !!value.trim();
  }

  static arrayNotEmpty(array) {
    return array.length > 0;
  }

  static isValidEmail(value) {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return pattern.test(value);
  }
}
