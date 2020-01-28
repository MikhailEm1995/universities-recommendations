import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import SpecialtyEntity from '../specialty/specialty.entity';

import { ICompetitionEntity } from './types';

@Entity('competition')
export default class CompetitionEntity implements ICompetitionEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'int4', nullable: false, default: '0' })
    public enrollee!: number;

    @Column({ type: 'int4', nullable: false, default: '0' })
    public slots!: number;

    @Column({ type: 'date' })
    public startDate!: Date;

    @Column({ type: 'date' })
    public endDate!: Date;

    @ManyToOne(_ => SpecialtyEntity, specialty => specialty.competitions, {
        cascade: ['remove', 'update'],
    })
    public specialty!: SpecialtyEntity;
}
