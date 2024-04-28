import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isUUID', async: false })
export class IsUUIDConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    const parts = value.split('-');

    if (parts.length !== 5) {
      return false;
    }

    const [part1, part2, part3, part4, part5] = parts;

    if (
      part1.length !== 8 ||
      part2.length !== 4 ||
      part3.length !== 4 ||
      part4.length !== 4 ||
      part5.length !== 12
    ) {
      return false;
    }

    const validChars = new Set('0123456789abcdef');

    for (const part of parts) {
      for (const char of part) {
        if (!validChars.has(char)) {
          return false;
        }
      }
    }

    return true;
  }

  defaultMessage() {
    return 'Value ($value) is not a valid UUID';
  }
}

export function IsUUID(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUUIDConstraint,
    });
  };
}
