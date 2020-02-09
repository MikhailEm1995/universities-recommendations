import { IDescriptionEntity } from '../description/types';
import { IUniversityEntity } from '../university/types';
import { ICourseLectorEntity } from '../course-lector/types';

export interface ICourseEntity {
    id: number;
    title: string;
    description: IDescriptionEntity;
    university: IUniversityEntity;
    lector: ICourseLectorEntity;
}