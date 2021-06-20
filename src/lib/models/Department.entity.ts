import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Province } from "./Province.entity";

@Entity({
    name: 'departments'
})
export class Department {

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

    @OneToMany(() => Province, item => item.department)
    provinces: Province[];
}