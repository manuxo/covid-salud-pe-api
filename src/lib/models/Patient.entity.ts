import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AuditableEntity } from "./AuditableEntity.entity";
import { District } from "./District.entity";
import { DocType } from "./DocType.entity";
import { User } from "./User.entity";

@Entity({
    name: 'patients'
})
export class Patient extends AuditableEntity {
    @PrimaryGeneratedColumn({
        type: 'int'
    })
    id: number;

    @Column({
        type: 'int',
        name: 'user_id'
    })
    userId: number;

    @OneToOne(() => User, item => item.patient)
    @JoinColumn({
        name: 'user_id',
        referencedColumnName: 'id'
    })
    user: User;

    @Column({
        type: 'int',
        name: 'district_id'
    })
    districtId: number;

    @ManyToOne(() => District, item => item.patients)
    @JoinColumn({
        name: 'district_id',
        referencedColumnName: 'id'
    })
    district: District;

    @Column({
        type: 'int',
        name: 'doc_type_id'
    })
    docTypeId: number;

    @ManyToOne(() => DocType, item => item.patients)
    @JoinColumn({
        name: 'doc_type_id',
        referencedColumnName: 'id'
    })
    docType: DocType;

    @Column({
        name: 'doc_number',
        length: 64
    })
    docNumber: string;

    @Column({
        name: 'first_name',
        length: 128
    })
    firstName: string;

    @Column({
        name: 'last_name',
        length: 128
    })
    lastName: string;

    @Column({
        name: 'full_name',
        length: 128
    })
    fullName: string;

    @Column({
        name: 'date_of_birth',
        type: 'date'
    })
    dateOfBirth: string;

    @Column({
        type: 'tinyint'
    })
    age: number;

    @Column({
        length: 64
    })
    phone: string;

    @Column({
        length: 128
    })
    address: string;

    @Column({
        length: 1
    })
    genre: string;
}