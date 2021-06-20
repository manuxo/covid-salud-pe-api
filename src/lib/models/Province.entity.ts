import { AutoMap } from "@automapper/classes";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Department } from "./Department.entity";
import { District } from "./District.entity";

@Entity({
    name: 'provinces'
})
export class Province {
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

    @ManyToOne(() => Department, item => item.provinces)
    @JoinColumn({
        name: 'department_id',
        referencedColumnName: 'id'
    })
    department: Department;

    @Column({
        type: "int",
        name: "department_id"
    })
    departmentId: number;

    @OneToMany(() => District, item => item.province)
    districts: District[];
}