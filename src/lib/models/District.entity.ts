import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Patient } from "./Patient.entity";

@Entity({
    name: 'districts'
})
export class District {

    @PrimaryColumn({
        type: 'int'
    })
    id: number;

    @Column({
        length: 64
    })
    name: string;

    @Column({
        name: 'ubigeo_code',
        length: 8
    })
    ubigeoCode: string;

    @OneToMany(() => Patient, item => item.district)
    patients: Patient[];
}