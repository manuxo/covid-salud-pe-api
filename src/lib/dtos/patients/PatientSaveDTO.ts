import { IsDateString, IsInt, IsString } from "class-validator";
import { CovidSaludConstants } from "../../common/CovidSaludConstants";

export class PatientSaveDTO {
    @IsInt({
        message: CovidSaludConstants.VALIDATION_MESSAGE_IS_INT
    })
    districtId: number;

    @IsInt({
        message: CovidSaludConstants.VALIDATION_MESSAGE_IS_INT
    })
    docTypeId: number;

    @IsString({
        message: CovidSaludConstants.VALIDATION_MESSAGE_IS_STRING
    })
    docNumber: string;

    @IsString({
        message: CovidSaludConstants.VALIDATION_MESSAGE_IS_STRING
    })
    firstName: string;

    @IsString({
        message: CovidSaludConstants.VALIDATION_MESSAGE_IS_STRING
    })
    lastName: string;

    @IsDateString({
        
    }, {
        message: CovidSaludConstants.VALIDATION_MESSAGE_IS_DATE_STRING
    })
    dateOfBirth: string;

    @IsInt({
        message: CovidSaludConstants.VALIDATION_MESSAGE_IS_INT
    })
    age: number;

    @IsString({
        message: CovidSaludConstants.VALIDATION_MESSAGE_IS_STRING
    })
    phone: string;

    @IsString({
        message: CovidSaludConstants.VALIDATION_MESSAGE_IS_STRING
    })
    address: string;

    @IsString({
        message: CovidSaludConstants.VALIDATION_MESSAGE_IS_STRING
    })
    genre: string;
}