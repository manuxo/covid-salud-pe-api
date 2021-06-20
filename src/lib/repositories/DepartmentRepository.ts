import { EntityRepository, Repository } from "typeorm";
import { Department } from "../models/Department.entity";

@EntityRepository(Department)
export class DepartmentRepository extends Repository<Department> {

}