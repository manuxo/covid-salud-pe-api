import { IsDateString, IsInt, IsString } from "class-validator";
import { CovidSaludConstants } from "../../common/CovidSaludConstants";

export class AllergySaveDTO {
    @IsInt({
        message: CovidSaludConstants.VALIDATION_MESSAGE_IS_INT
    })
    patientId: number;

    @IsString({
        message: CovidSaludConstants.VALIDATION_MESSAGE_IS_STRING
    })
    name: string;

    @IsDateString({
        
    }, {
        message: CovidSaludConstants.VALIDATION_MESSAGE_IS_DATE_STRING
    })
    dateOfDiagnosis: string;

    @IsDateString({
        
    }, {
        message: CovidSaludConstants.VALIDATION_MESSAGE_IS_DATE_STRING
    })
    dateOfResolution: string;

    @IsString({
        message: CovidSaludConstants.VALIDATION_MESSAGE_IS_STRING
    })
    details: string;
}