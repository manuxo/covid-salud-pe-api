import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AuditableEntity } from "./AuditableEntity.entity";
import { Patient } from "./Patient.entity";

@Entity({
    name: 'diseases'
})
export class Disease extends AuditableEntity {
    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number;

    @Column({
        type: 'int',
        name: 'patient_id'
    })
    patientId: number;

    @ManyToOne(() => Patient, item => item.diseases)
    @JoinColumn({
        name: 'patient_id',
        referencedColumnName: 'id'
    })
    patient: Patient;

    @Column({
        length: 64
    })
    name: string;

    @Column({
        name: 'date_of_diagnosis',
        type: 'date'
    })
    dateOfDiagnosis: Date;

    @Column({
        name: 'date_of_resolution',
        type: 'date'
    })
    dateOfResolution: Date;

    @Column({
        length: 256
    })
    details: string;
}