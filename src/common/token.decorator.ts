import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ResponseUtils } from './response.service';

export const Token = createParamDecorator(
    (_data: unknown, ctx: ExecutionContext) => {
        try {
            const request = ctx.switchToHttp().getRequest();
            if (!request.headers['authorization']) {
                throw ResponseUtils.InternalErrorResponse('This Request should have Token');
            }
            const token = request.headers['authorization'].split(' ')
            return token[1];
        } catch (error) {
            throw ResponseUtils.InternalErrorResponse(error);
        }
    },
);