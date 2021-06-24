import { NextFunction, Request, Response } from "express";
import { BusinessError } from "../common/BusinessError";
import { SingleResponse } from "../common/ApiResponses";
import { ValidationError } from "class-validator";
//import { UnauthorizedError } from "express-jwt";

export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);
    let code = 500;
    let response: any;
    /*if (err instanceof UnauthorizedError){
        code = 401;
        response = SingleResponse("invalid token", false);
    } else*/ if (err instanceof BusinessError) {
        code = err.code;
        response = SingleResponse(err.message, false);
    } else if (err instanceof Array && err[0] instanceof ValidationError) {
        code = 400;
        let message: string = "";
        err.forEach(validationError => {
            for (const validationMessage of Object.values(validationError.constraints)) {
                message = message.concat(`${validationMessage}\n`);
            }
        });
        response = SingleResponse(message, false);
    } else {
        response = SingleResponse(err.message, false);
    }
    res.status(code).send(response);
}