import { ArgumentMetadata, BadRequestException, ValidationPipe } from "@nestjs/common";
import { Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ResponseUtils } from "./response.service";

@Injectable()
export class ValidatePipe extends ValidationPipe {

    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.validateMetaType(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            throw ResponseUtils.BadRequestResponse(this.flattenValidationErrors(errors));
        }
        return value;
    }

    prependConstraintsWithParentProp(parentPath, error) {
        const constraints = {};
        for (const key in error.constraints) {
            constraints[key] = `${parentPath}: ${error.constraints[key]}`;
        }
        return Object.assign(Object.assign({}, error), { constraints });
    }

    private validateMetaType(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype)
    }
}