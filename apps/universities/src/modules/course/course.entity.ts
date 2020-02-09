import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

import DescriptionEntity from '../description/description.entity';
import UniversityEntity from '../university/university.entity';
import CourseLectorEntity from '../course-lector/course-lector.entity';

import { ICourseEntity } from './types';

@Entity('course')
export default class CourseEntity implements ICourseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    public title!: string;

    @OneToOne(_ => DescriptionEntity, {
        cascade: ['update'],
    })
    @JoinColumn({
        name: 'description_id',
    })
    public description!: DescriptionEntity;

    @ManyToOne(_ => UniversityEntity, university => university.courses, {
        cascade: ['remove'],
        nullable: false,
    })
    public university!: UniversityEntity;

    @ManyToOne(_ => CourseLectorEntity, lector => lector.courses, {
        cascade: ['remove'],
        nullable: false,
    })
    public lector!: CourseLectorEntity;
}