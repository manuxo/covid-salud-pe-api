import { EntityRepository, Repository } from "typeorm";
import { Role } from "../models/Role.entity";

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
    
}