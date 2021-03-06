import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import UniversityEntity from '../university/university.entity';

import { IRoleEntity } from './types';

@Entity('role')
export default class RoleEntity implements IRoleEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id!: number;

    @ApiProperty()
    @Column({
        type: 'varchar',
    })
    public title!: string;

    @ManyToOne(_ => UniversityEntity, university => university.roles)
    public university!: UniversityEntity;
}