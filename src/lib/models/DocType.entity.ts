import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Patient } from "./Patient.entity";

@Entity({
    name: 'doc_types'
})
export class DocType {

    @PrimaryColumn({
        type: 'int'
    })
    id: number;

    @Column({
        length: 64
    })
    name: string;

    @OneToMany(() => Patient, item => item.docType)
    patients: Patient[];
}