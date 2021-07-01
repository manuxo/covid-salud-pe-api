import { EntityRepository, Repository } from "typeorm";
import { District } from "../models/District.entity";

@EntityRepository(District)
export class DistrictRepository extends Repository<District> {

}