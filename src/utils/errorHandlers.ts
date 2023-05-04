import { httpStatusCodes } from "../constants/appConstants";
import {CustomError, ValidationError} from "./errors";
//function for getting all errors produced by mongodb
function getMongoErrors(error: any){
    //if it is validatio nerror, make object with all errors and throw new validation error
    if(error.message.toLowerCase().includes("validation failed")){
        let errors: any ={};

        Object.values(error.errors).forEach((properties: any)=>{
            errors[properties.path] = properties.message;
        });

        throw new ValidationError(errors);
    }
    throw new CustomError(httpStatusCodes.INTERNAL_SERVER, error.name, error.message);
}

export { getMongoErrors};