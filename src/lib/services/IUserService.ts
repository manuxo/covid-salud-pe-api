import { DatabaseManager } from "../database/DatabaseManager";
import { LoginDTO } from "../dtos/users/LoginDTO";
import { UserPatientSaveDTO } from "../dtos/users/UserPatientSaveDTO";

export interface IUserService {
    _database: DatabaseManager;

    registerPatient(dto: UserPatientSaveDTO): Promise<any>;
    signIn(dto: LoginDTO): Promise<any>
}