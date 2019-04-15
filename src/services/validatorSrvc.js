export const validationTypes = {
  isRequired: "isRequired",
  arrayNotEmpty: "arrayNotEmpty"
};

export const validationErrorCodes = {
  isRequired: 201,
  arrayNotEmpty: 202
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
      if(!this[validators[i]](value)) {
        return validationErrorCodes[validators[i]];
      }
    }

    return null
  };

  static isRequired(value) {
    return !!value.trim();
  }

  static arrayNotEmpty(array) {
    return array.length > 0;
  }
}