import { IsEmail, IsString } from "class-validator";
import { CovidSaludConstants } from "../../common/CovidSaludConstants";

export class LoginDTO {
    @IsEmail({
        
    },{
        message: CovidSaludConstants.VALIDATION_MESSAGE_IS_EMAIL
    })
    username: string;

    @IsString({
        message: CovidSaludConstants.VALIDATION_MESSAGE_IS_STRING
    })
    password: string;
}