import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoolTinyIntTransformer } from "../database/BoolTinyIntTransformer";
import { AuditableEntity } from "./AuditableEntity.entity";
import { Patient } from "./Patient.entity";
import { Role } from "./Role.entity";

@Entity({
    name: 'users'
})
export class User extends AuditableEntity {

    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number;

    @Column({
        name: 'role_id'
    })
    roleId: number;

    @ManyToOne(() => Role, item => item.users)
    @JoinColumn({
        name: 'role_id',
        referencedColumnName: 'id'
    })
    role: Role;

    @Column({
        length: 64
    })
    username: string;

    @Column({
        length: 128
    })
    password: string;

    @Column({
        length: 64
    })
    email: string;

    @Column({
        name: 'personal_data_policy',
        type: 'tinyint',
        transformer: new BoolTinyIntTransformer()
    })
    personalDataPolicy: boolean;

    @Column({
        name: 'one_time_password',
        length: 128
    })
    oneTimePassword: string;

    @OneToOne(() => Patient, item => item.user, {
        cascade: true
    })
    patient: Patient;
}