export const validationTypes = {
  isRequired: "isRequired"
};

export const validationErrorCodes = {
  success: 200,
  isRequired: 201
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
}