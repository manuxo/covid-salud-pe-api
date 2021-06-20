import { Type } from "class-transformer";
import { IsBoolean, IsEmail, IsString, ValidateNested } from "class-validator";
import { CovidSaludConstants } from "../../common/CovidSaludConstants";
import { PatientSaveDTO } from "./PatientSaveDTO";

export class UserPatientSaveDTO {
    @IsString({
        message: CovidSaludConstants.VALIDATION_MESSAGE_IS_STRING
    })
    password: string;

    @IsEmail({
        
    },{
        message: CovidSaludConstants.VALIDATION_MESSAGE_IS_EMAIL
    })
    email: string;
    
    @IsBoolean({
        message: CovidSaludConstants.VALIDATION_MESSAGE_IS_BOOLEAN
    })
    personalDataPolicy: boolean;

    @ValidateNested({
        message: CovidSaludConstants.VALIDATION_MESSAGE_PATIENT_IS_REQUIRED
    })
    @Type(() => PatientSaveDTO)
    patient: PatientSaveDTO;
}