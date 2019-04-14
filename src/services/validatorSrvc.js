export const validationTypes = {
  isRequired: "isRequired",
  arrayNotEmpty: "arrayNotEmpty"
};

export const validationErrorCodes = {
  success: 200,
  isRequired: 201,
  arrayNotEmpty: 202
};

export class validatorSrvc {

  static validate(value, ...args) {
    for (let i = 0; i < args.length; i++) {
      if(!this[args[i]](value)) {
        return validationErrorCodes[args[i]];
      }
    }

    return validationErrorCodes.success
  };

  static isRequired(value) {
    return !!value.trim();
  }

  static arrayNotEmpty(array) {
    return array.length > 0;
  }
}