import { EntityRepository, Repository } from "typeorm";
import { DocType } from "../models/DocType.entity";

@EntityRepository(DocType)
export class DocTypeRepository extends Repository<DocType> {
    
}