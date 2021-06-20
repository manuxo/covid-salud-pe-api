import { plainToClass } from "class-transformer";
import { SecurityUtils } from "../../auth/SecurityUtils";
import { BusinessError } from "../../common/BusinessError";
import { CovidSaludConstants } from "../../common/CovidSaludConstants";
import { DatabaseManager } from "../../database/DatabaseManager";
import { UserPatientSaveDTO } from "../../dtos/patients/UserPatientSaveDTO";
import { User } from "../../models/User.entity";
import { UserRepository } from "../../repositories/UserRepository";
import { IUserService } from "../IUserService";


export class UserService implements IUserService {
    _database: DatabaseManager;

    constructor() {
        this._database = new DatabaseManager();
        this.registerPatient = this.registerPatient.bind(this);
    }

    async registerPatient(dto: UserPatientSaveDTO): Promise<any> {
        try {
            const conn = await this._database.getConnection();
            const entity = plainToClass(User, dto);
            return await conn.transaction(async transactionalEntityManager => {
                const userRepo = transactionalEntityManager.getCustomRepository(UserRepository);
                const userByEmail = await userRepo.find({ where: { email: dto.email }});
                if (userByEmail.length > 0) {
                    throw new BusinessError(`Ya existe un usuario con el correo: ${dto.email}`, 400);
                }
                const hashedPassword = await SecurityUtils.hashPassword(dto.password);
                entity.password = hashedPassword;
                entity.username = dto.email;
                entity.roleId = CovidSaludConstants.ROLES_ID_PATIENT_USER;
                entity.patient.fullName = `${dto.patient.firstName} ${dto.patient.lastName}`;
                const user = await userRepo.save(entity);
                return user;
            }).catch(error => {
                return Promise.reject(error);
            })
        } catch (error) {
            return Promise.reject(error);
        }
    }
}