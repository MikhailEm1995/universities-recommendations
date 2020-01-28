import SpecialtyEntity from '../specialty/specialty.entity';
import { IThresholdEntity } from '../threshold/types';

export interface ICompetitionEntity {
    id: number;
    /** number of covered slots */
    enrollee: number;
    slots: number;
    specialty: SpecialtyEntity;
    startDate: Date;
    endDate: Date;
    thresholds: IThresholdEntity[];
}
