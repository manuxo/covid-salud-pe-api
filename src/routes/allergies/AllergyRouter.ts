import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import express, { NextFunction, Request, Response } from "express";
import { ResultResponse, SingleResponse } from "../../lib/common/ApiResponses";
import { BusinessError } from "../../lib/common/BusinessError";
import { CovidSaludConstants } from "../../lib/common/CovidSaludConstants";
import { StringUtils } from "../../lib/common/StringUtils";
import { AllergySaveDTO } from "../../lib/dtos/allergies/AllergySaveDTO";
import { AllergyUpdateDTO } from "../../lib/dtos/allergies/AllergyUpdateDTO";
import { AllergyService } from "../../lib/services/impl/AllergyService";


const AllergyRouter = express.Router();

const _allergyService = new AllergyService();
const ENTITY_NAME = 'Allergies';

AllergyRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        let page = +req.query.page;
        let pageSize = +req.query.pageSize;
        let patientId = +req.query.patientId;
        const { sortOrder, search } = req.query;
        const [result, count] = await _allergyService.getPaged(page, pageSize, sortOrder as string, search as string, patientId);
        if (!page || !pageSize) {
            page = 1;
            pageSize = count;
        }
        const message = StringUtils.format(CovidSaludConstants.MESSAGE_RESPONSE_GET_SUCCESS, ENTITY_NAME);
        const response = ResultResponse(page, pageSize, count, message, true, result);
        res.status(200).send(response);
    } catch (error) {
        return next(error);
    }
});

AllergyRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id;
        const result = await _allergyService.getById(id);
        if (!result) {
            throw new BusinessError(StringUtils.format(CovidSaludConstants.MESSAGE_RESPONSE_NOT_FOUND, ENTITY_NAME, id.toString()), 404);
        }
        const message = StringUtils.format(CovidSaludConstants.MESSAGE_RESPONSE_GET_SUCCESS, ENTITY_NAME);
        const response = SingleResponse(message, true, result);
        res.status(200).send(response);
    } catch (error) {
        return next(error);
    }
});

AllergyRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const dto: AllergySaveDTO = plainToClass(AllergySaveDTO, req.body);
        const errors = await validate(dto);
        if (errors.length > 0) {
            return next(errors);
        }
        const result = await _allergyService.save(dto);
        const message = StringUtils.format(CovidSaludConstants.MESSAGE_RESPONSE_POST_SUCCESS, ENTITY_NAME);
        const response = SingleResponse(message, true, result);
        res.status(201).send(response);
    } catch (error) {
        return next(error);
    }
});

AllergyRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id;
        const dto: AllergyUpdateDTO = plainToClass(AllergyUpdateDTO, req.body);
        const errors = await validate(dto);
        if (errors.length > 0) {
            return next(errors);
        }
        const result = await _allergyService.update(id, dto);
        const message = StringUtils.format(CovidSaludConstants.MESSAGE_RESPONSE_PUT_SUCCESS, ENTITY_NAME);
        const response = SingleResponse(message, true, result);
        res.status(200).send(response);
    } catch (error) {
        return next(error);
    }
});

AllergyRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = +req.params.id;
        const result = await _allergyService.softDelete(id);
        const message = StringUtils.format(CovidSaludConstants.MESSAGE_RESPONSE_DELETE_SUCCESS, ENTITY_NAME);
        const response = SingleResponse(message, true, result);
        res.status(200).send(response);
    } catch (error) {
        return next(error);
    }
});

export default AllergyRouter;