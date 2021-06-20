import { DatabaseManager } from "../../database/DatabaseManager";
import { Department } from "../../models/Department.entity";
import { DepartmentRepository } from "../../repositories/DepartmentRepository";
import { IService } from "../IService";


export class DepartmentService implements IService<number, Department, Department, Department> {
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

    async getAll(): Promise<[Department[], number]> {
        try {
            const conn = await this._database.getConnection();
            const departmentRepo = conn.getCustomRepository(DepartmentRepository);
            const result = await departmentRepo.findAndCount({
                relations: [
                    "provinces",
                    "provinces.districts"
                ]
            });
            return result;
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
    }
    getPaged(page: number, pageSize: number, sortOrder: string, search: string): Promise<[any[], number]> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
    save(dto: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    update(id: number, dto: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    softDelete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}