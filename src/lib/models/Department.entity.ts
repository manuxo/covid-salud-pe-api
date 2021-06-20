import { AutoMap } from "@automapper/classes";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Province } from "./Province.entity";

@Entity({
    name: 'departments'
})
export class Department {

    @PrimaryColumn({
        type: 'int'
    })
    @AutoMap()
    id: number;

    @Column({
        length: 64
    })
    @AutoMap()
    name: string;

    @Column({
        name: 'ubigeo_code',
        length: 8
    })
    @AutoMap()
    ubigeoCode: string;

    @AutoMap()
    @OneToMany(() => Province, item => item.department)
    provinces: Province[];
}