import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { District } from "./District.entity";
import { User } from "./User.entity";

@Entity({
    name: 'roles'
})
export class Role {

    @PrimaryColumn({
        type: 'int'
    })
    id: number;

    @Column({
        length: 64
    })
    name: string;

    @OneToMany(() => User, item => item.role)
    users: User[];
}