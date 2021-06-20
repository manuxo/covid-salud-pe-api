import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import express, { NextFunction, Request, Response } from "express";
import { SingleResponse } from "../../lib/common/ApiResponses";
import { CovidSaludConstants } from "../../lib/common/CovidSaludConstants";
import { StringUtils } from "../../lib/common/StringUtils";
import { UserPatientSaveDTO } from "../../lib/dtos/patients/UserPatientSaveDTO";
import { UserService } from "../../lib/services/impl/UserService";

const UserRouter = express.Router();

const _userService = new UserService();
const ENTITY_NAME = 'User';

UserRouter.post('/register-patient', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dto: UserPatientSaveDTO = plainToClass(UserPatientSaveDTO, req.body);
        const errors = await validate(dto);
        if (errors.length > 0) {
            return next(errors);
        }
        const result = await _userService.registerPatient(dto);
        const message = StringUtils.format(CovidSaludConstants.MESSAGE_RESPONSE_POST_SUCCESS, ENTITY_NAME);
        const response = SingleResponse(message, true, result);
        res.status(201).send(response);
    } catch (error) {
        return next(error);
    }
});

export default UserRouter;