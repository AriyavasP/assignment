import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    Logger,
    HttpException,
    HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

    private readonly logger = new Logger(HttpException.name, { timestamp: true });

    catch(exception: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        this.logger.error(JSON.stringify('Exception : ' + JSON.stringify(exception)));

        const statusCode = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
        const exceptionResponse: any = exception.getResponse();
        const statusMessage = statusCode === HttpStatus.INTERNAL_SERVER_ERROR ? 'Internal Server Error' : exceptionResponse.message || exceptionResponse.error || exceptionResponse.errors || 'Internal Server Error';
        const errorCode = statusCode === HttpStatus.INTERNAL_SERVER_ERROR ? '500' : exceptionResponse.code;

        const errorResponse = {
            status: statusCode,
            code: errorCode,
            message: statusMessage
        };

        const errorMessage = exceptionResponse.message || JSON.stringify(exceptionResponse.error) || JSON.stringify(exceptionResponse.errors) || 'Internal Server Error'

        if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
            this.logger.error(JSON.stringify(`${request.method} ${request.url} ${errorMessage}`));
        } else {
            this.logger.warn(JSON.stringify(`${request.method} ${request.url} ${JSON.stringify(errorResponse)}`));
        }

        response.status(statusCode).json(errorResponse);
    }
}