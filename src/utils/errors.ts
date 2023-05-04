import {errorTypes, httpStatusCodes} from "../constants/appConstants";
//base error class that contains statuscode, type and message
class BaseError extends Error {
    constructor(readonly statusCode:number, readonly type: string, readonly message: string){
        super();
    }
}
//custom error
class CustomError extends BaseError {
    constructor(statusCode: number, type: string, message: string){
        super(statusCode, type, message);
    }
}
//bad request error, status code is 400, type bad request
class BadRequestError extends BaseError {
    constructor(message: string){
        super(httpStatusCodes.BAD_REQUEST, errorTypes.BAD_REQUEST, message);
    }
}
//validation eror, status code is 400, type validation
class ValidationError extends BaseError {
    constructor(message: string){
        super(httpStatusCodes.BAD_REQUEST, errorTypes.VALIDATION, message);
    }
}

export {
    BaseError,
    CustomError,
    BadRequestError,
    ValidationError
};