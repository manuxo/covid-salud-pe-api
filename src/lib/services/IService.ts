import { DatabaseManager } from "../database/DatabaseManager";

export interface IService<ID,GetDTO,SaveDTO,UpdateDTO> {
    _database: DatabaseManager;
    getAll(): Promise<[GetDTO[], number]>;

    getPaged(page: number, pageSize: number, sortOrder: string, search: string): Promise<[GetDTO[], number]>;

    getById(id: ID): Promise<GetDTO>;

    save(dto: SaveDTO): Promise<GetDTO>;

    update(id: ID, dto: UpdateDTO): Promise<GetDTO>;

    softDelete(id: ID): Promise<boolean>;
}