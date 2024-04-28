import { HttpStatus } from "@nestjs/common";

export class HttpResponse {
    private status: number;
    private code: string;
    private message: any;
    private data: any;
    private count: number;

    SuccessReponse(data: any, httpStatus: number) {
        this.status = httpStatus;
        this.code = httpStatus.toString();
        this.data = data;
        return this;
    }

    InternalErrorResponse(error: any) {
        this.status = HttpStatus.INTERNAL_SERVER_ERROR;
        this.code = '500';
        this.message = error;
        return this;
    }

    BadRequestResponse(error: any) {
        this.status = HttpStatus.BAD_REQUEST;
        this.code = '400';
        this.message = error;
        return this;
    }

    getStatus() {
        return this.status;
    }

    getResponse() {
        return this
    }
}

export class ResponseUtils {
    static Reponse(data: any, httpStatus: number) {
        return new HttpResponse().SuccessReponse(data, httpStatus);
    }
    static InternalErrorResponse(error: any) {
        return new HttpResponse().InternalErrorResponse(error);
    }
    static BadRequestResponse(error: any) {
        return new HttpResponse().BadRequestResponse(error);
    }
}