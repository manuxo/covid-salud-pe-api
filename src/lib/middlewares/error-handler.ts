import { NextFunction, Request, Response } from "express";
import { BusinessError } from "../common/BusinessError";
import { SingleResponse } from "../common/ApiResponses";
//import { UnauthorizedError } from "express-jwt";

export function errorHandler(
    err: any, 
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    console.error(err);
    let code: number = 500;
    let response: any;
    /*if (err instanceof UnauthorizedError){
        code = 401;
        response = SingleResponse("invalid token", false);
    } else*/ if (err instanceof BusinessError || err.code) {
        code = err.code;
        response = SingleResponse(err.message, false);
    } else {
        response = SingleResponse(err.message, false);
    }
    res.status(code).send(response);
}