
import express, { NextFunction, Request, Response } from "express";
import { ResultResponse } from "../../lib/common/ApiResponses";
import { CovidSaludConstants } from "../../lib/common/CovidSaludConstants";
import { StringUtils } from "../../lib/common/StringUtils";
import { DistrictService } from "../../lib/services/impl/DistrictService";


const DistrictRouter = express.Router();

const _districtService = new DistrictService();
const ENTITY_NAME = 'Districts';

DistrictRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const page = 1;
        const [result, count] = await _districtService.getAll();
        const pageSize = count;
        const message = StringUtils.format(CovidSaludConstants.MESSAGE_RESPONSE_GET_SUCCESS, ENTITY_NAME);
        const response = ResultResponse(page, pageSize, count, message, true, result);
        res.status(200).send(response);
    } catch (error) {
        return next(error);
    }
});

export default DistrictRouter;