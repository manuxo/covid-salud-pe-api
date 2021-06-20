import { EntityRepository, Repository } from "typeorm";
import { Patient } from "../models/Patient.entity";

@EntityRepository(Patient)
export class PatientRepository extends Repository<Patient> {
    
}