import { plainToClass } from "class-transformer";
import { BusinessError } from "../../common/BusinessError";
import { CovidSaludConstants } from "../../common/CovidSaludConstants";
import { StringUtils } from "../../common/StringUtils";
import { DatabaseManager } from "../../database/DatabaseManager";
import { AllergySaveDTO } from "../../dtos/allergies/AllergySaveDTO";
import { AllergyUpdateDTO } from "../../dtos/allergies/AllergyUpdateDTO";
import { Allergy } from "../../models/Allergy.entity";
import { AllergyRepository } from "../../repositories/AllergyRepository";
import { IAllergyService } from "../IAllergyService";


export class AllergyService implements IAllergyService<number, Allergy, AllergySaveDTO, AllergyUpdateDTO> {
    _database: DatabaseManager;

    constructor() {
        this._database = new DatabaseManager();
        this.getAll = this.getAll.bind(this);
        this.getPaged = this.getPaged.bind(this);
        this.getById = this.getById.bind(this);
        this.save = this.save.bind(this);
        this.update = this.update.bind(this);
        this.softDelete = this.softDelete.bind(this);
    }

    getAll(): Promise<[Allergy[], number]> {
        throw new Error("Method not implemented.");
    }
    async getPaged(page: number, pageSize: number, sortOrder: string = 'DESC', search: string, patientId: number): Promise<[Allergy[], number]> {
        try {
            const conn = await this._database.getConnection();
            const skip = (page - 1) * pageSize;
            const allergyRepo = conn.getCustomRepository(AllergyRepository);
            const qb = allergyRepo.createQueryBuilder('a')
                .where('a.deleted_at is null');
            
            if (search) {
                qb.andWhere(`concat(a.name,a.date_of_diagnosis,a.date_of_resolution) like '%${search}%'`);
            }

            if (patientId) {
                qb.andWhere(`a.patient_id = ${patientId}`);
            }

            qb.orderBy({
                'a.id': sortOrder as any
            });

            if(page && pageSize) {
                qb.skip(skip);
                qb.take(pageSize);
            }

            const result = await qb.getManyAndCount();
            return result;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
    async getById(id: number): Promise<Allergy> {
        try {
            const conn = await this._database.getConnection();
            const allergyRepo = conn.getCustomRepository(AllergyRepository);
            const allergy = await allergyRepo.findOne({ id });
            return allergy;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
    async save(dto: AllergySaveDTO): Promise<Allergy> {
        try {
            const conn = await this._database.getConnection();
            const entity = plainToClass(Allergy, dto);
            return await conn.transaction(async transactionalEntityManager => {
                const allergyRepo = transactionalEntityManager.getCustomRepository(AllergyRepository);
                const allergy = await allergyRepo.save(entity);
                return allergy;
            }).catch(error => {
                return Promise.reject(error);
            });
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }
    async update(id: number, dto: AllergyUpdateDTO): Promise<Allergy> {
        try {
            const conn = await this._database.getConnection();
            return await conn.transaction(async transactionalEntityManager => {
                const allergyRepo = transactionalEntityManager.getCustomRepository(AllergyRepository);
                const entity = await allergyRepo.findOne(id);

                if (!entity) {
                    const notFoundError = new BusinessError(StringUtils.format(CovidSaludConstants.MESSAGE_RESPONSE_NOT_FOUND, 'Allergies', id.toString()), 404);
                    return Promise.reject(notFoundError);
                }
                entity.name = dto.name;
                entity.dateOfDiagnosis = new Date(dto.dateOfDiagnosis);
                entity.dateOfResolution = new Date(dto.dateOfResolution);
                entity.details = dto.details;
                await allergyRepo.save(entity);
                const response = await allergyRepo.findOne(id);
                return response;
            }).catch(error => {
                return Promise.reject(error);
            });
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }
    async softDelete(id: number): Promise<boolean> {
        try {
            const conn = await this._database.getConnection();
            const allergyRepo = conn.getCustomRepository(AllergyRepository);
            const entity = await allergyRepo.findOne(id);
            if (!entity) {
                const notFoundError = new BusinessError(StringUtils.format(CovidSaludConstants.MESSAGE_RESPONSE_NOT_FOUND, 'Allergies', id.toString()), 404);
                return Promise.reject(notFoundError);
            }
            const allergy = await allergyRepo.softRemove(entity);
            return allergy ? true : false;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }

}