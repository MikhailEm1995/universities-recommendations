import { Entity, Column, ManyToOne, OneToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';

import { IFacultyAddressEntity } from './types';
import FacultyEntity from './faculty.entity';

import AddressEntity from '../address/address.entity';

@Entity('faculty_address')
export default class FacultyAddressEntity implements IFacultyAddressEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({
        type: 'varchar',
    })
    public title!: string;

    @ManyToOne(_ => FacultyEntity, faculty => faculty.addresses)
    public faculty!: FacultyEntity;

    @OneToOne(_ => AddressEntity, {
        cascade: ['remove'],
        nullable: false,
    })
    @JoinColumn({
        name: 'address_id',
    })
    public address!: AddressEntity;
}