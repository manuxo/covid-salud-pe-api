import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Patient } from "./Patient.entity";
import { Province } from "./Province.entity";

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

    @ManyToOne(() => Province, item => item.districts)
    @JoinColumn({
        name: 'province_id',
        referencedColumnName: 'id'
    })
    province: Province;

    @Column({
        type: "int",
        name: "province_id"
    })
    provinceId: number;

    @OneToMany(() => Patient, item => item.district)
    patients: Patient[];
}