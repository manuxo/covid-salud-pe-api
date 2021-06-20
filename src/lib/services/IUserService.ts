import { DatabaseManager } from "../database/DatabaseManager";
import { UserPatientSaveDTO } from "../dtos/patients/UserPatientSaveDTO";

export interface IUserService {
    _database: DatabaseManager;

    registerPatient(dto: UserPatientSaveDTO): Promise<any>;
}