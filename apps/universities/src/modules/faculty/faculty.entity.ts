import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import UniversityEntity from '../university/university.entity';
import DepartmentEntity from '../department/department.entity';
import DescriptionEntity from '../description/description.entity';

import { IFacultyEntity } from './types';
import FacultyAddressEntity from './faculty-address.entity';

@Entity('faculty')
export default class FacultyEntity implements IFacultyEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    public id!: number;

    @ApiProperty()
    @Column({
        type: 'varchar',
    })
    public title!: string;

    @ManyToOne(_ => UniversityEntity, university => university.faculties, {
        cascade: ['remove'],
        nullable: false,
    })
    public university!: UniversityEntity;

    @ApiProperty()
    @OneToMany(_ => DepartmentEntity, department => department.faculty)
    public departments!: DepartmentEntity[];

    @ApiProperty()
    @OneToOne(_ => DescriptionEntity, {
        cascade: ['update'],
    })
    @JoinColumn({
        name: 'description_id',
    })
    public description!: DescriptionEntity;

    @ApiProperty()
    @OneToMany(_ => FacultyAddressEntity, address => address.faculty)
    public addresses!: FacultyAddressEntity[];
}
