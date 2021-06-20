
export class CovidSaludConstants {

    public static readonly DATABASE_MANAGER_CONNECTION_NAME : string = "mysql-conn-dev'";
    
    public static readonly MESSAGE_RESPONSE_GET_SUCCESS : string = "{0}: Retrieved successfully";
    public static readonly MESSAGE_RESPONSE_POST_SUCCESS : string = "{0}: Created successfully";
    public static readonly MESSAGE_RESPONSE_PUT_SUCCESS : string = "{0}: Updated successfully";
    public static readonly MESSAGE_RESPONSE_DELETE_SUCCESS : string = "{0}: Deleted successfully";
    public static readonly MESSAGE_RESPONSE_NOT_FOUND : string = "{0} with id {1} not found";

    public static readonly VALIDATION_MESSAGE_IS_STRING: string = "$property debe ser del tipo texto";
    public static readonly VALIDATION_MESSAGE_IS_FLOAT: string = "$property debe ser del tipo float";
    public static readonly VALIDATION_MESSAGE_IS_BOOLEAN: string = "$property debe ser del tipo boolean";
    public static readonly VALIDATION_MESSAGE_IS_INT: string = "$property debe ser del tipo entero";
    public static readonly VALIDATION_MESSAGE_IS_EMAIL: string = "$property debe ser del tipo email";
    public static readonly VALIDATION_MESSAGE_IS_ARRAY: string = "$property debe ser del tipo array";
    public static readonly VALIDATION_MESSAGE_IS_DATE_STRING: string = "$property debe ser del tipo fecha (ISO String)";


    public static readonly VALIDATION_MESSAGE_PATIENT_IS_REQUIRED: string = "$property: Debe ingresar información del paciente";
    
    public static readonly BCRYPT_SALT_ROUNDS: string | number = 10;

    public static readonly ROLES_ID_PATIENT_USER: number = 1;
}