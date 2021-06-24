import { plainToClass } from "class-transformer";
import { SecurityUtils } from "../../auth/SecurityUtils";
import { BusinessError } from "../../common/BusinessError";
import { CovidSaludConstants } from "../../common/CovidSaludConstants";
import { DatabaseManager } from "../../database/DatabaseManager";
import { LoginDTO } from "../../dtos/users/LoginDTO";
import { UserPatientSaveDTO } from "../../dtos/users/UserPatientSaveDTO";
import { Patient } from "../../models/Patient.entity";
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
            let entity = plainToClass(User, dto);
            return await conn.transaction(async transactionalEntityManager => {
                const userRepo = transactionalEntityManager.getCustomRepository(UserRepository);
                const userByEmail = await userRepo.find({ where: { email: dto.email } });
                if (userByEmail.length > 0) {
                    throw new BusinessError(`Ya existe un usuario con el correo: ${dto.email}`, 400);
                }
                const hashedPassword = await SecurityUtils.hashPassword(dto.password);
                entity.password = hashedPassword;
                entity.username = dto.email;
                entity.roleId = CovidSaludConstants.ROLES_ID_PATIENT_USER;
                entity.patient.fullName = `${dto.patient.firstName} ${dto.patient.lastName}`;

                entity = await userRepo.save(entity);
                const user = await userRepo.findOne(entity.id, {
                    relations: [
                        "patient",
                        "role"
                    ]
                });
                delete user.patient.userId;
                const token = SecurityUtils.generateAccessToken({
                    username: user.username,
                    patient: user.patient,
                    userId: user.id,
                    roleId: user.roleId
                });
                const result = {
                    token,
                    patient: user.patient,
                    username: user.username,
                    email: user.email
                }
                return result;
            }).catch(error => {
                return Promise.reject(error);
            })
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async signIn(dto: LoginDTO): Promise<any> {
        try {
            const conn = await this._database.getConnection();
            return await conn.transaction(async transactionalEntityManager => {
                const userRepo = transactionalEntityManager.getCustomRepository(UserRepository);

                const user = await userRepo.findOne({
                    where: { username: dto.username },
                    relations: [
                        "patient",
                        "role"
                    ]
                });
                if (user === null || user === undefined) {
                    throw new BusinessError(`No existe el usuario: ${dto.username}`, 400);
                }
                const passwordDidMatch = SecurityUtils.compareStrings(dto.password, user.password);
                if (passwordDidMatch) {
                    const token = SecurityUtils.generateAccessToken({
                        username: user.username,
                        patient: user.patient,
                        userId: user.id,
                        roleId: user.roleId
                    });
                    const result = {
                        token,
                        patient: user.patient,
                        username: user.username,
                        email: user.email
                    }
                    return result;
                } else {
                    throw new BusinessError(`La contraseña no coincide, por favor valide el correo y/o la clave ingresada`, 400);
                }
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
}