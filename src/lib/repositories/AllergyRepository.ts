import { EntityRepository, Repository } from "typeorm";
import { Allergy } from "../models/Allergy.entity";

@EntityRepository(Allergy)
export class AllergyRepository extends Repository<Allergy> {
    
}