import { DatabaseManager } from "../../database/DatabaseManager";
import { Disease } from "../../models/Disease.entity";
import { IService } from "../IService";


export class DiseaseService implements IService<number, Disease, Disease, Disease> {
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

    getAll(): Promise<[Disease[], number]> {
        throw new Error("Method not implemented.");
    }
    getPaged(page: number, pageSize: number, sortOrder: string, search: string): Promise<[Disease[], number]> {
        throw new Error("Method not implemented.");
    }
    getById(id: number): Promise<Disease> {
        throw new Error("Method not implemented.");
    }
    save(dto: Disease): Promise<Disease> {
        throw new Error("Method not implemented.");
    }
    update(id: number, dto: Disease): Promise<Disease> {
        throw new Error("Method not implemented.");
    }
    softDelete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}