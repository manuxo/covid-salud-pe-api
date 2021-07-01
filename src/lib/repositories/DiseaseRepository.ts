import { EntityRepository, Repository } from "typeorm";
import { Disease } from "../models/Disease.entity";

@EntityRepository(Disease)
export class DiseaseRepository extends Repository<Disease> {
    
}