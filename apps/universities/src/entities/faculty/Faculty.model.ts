import { Model, Table, Column, ForeignKey, PrimaryKey, DataType, BelongsTo } from 'sequelize-typescript';

import { UniversityModel } from '@entities/university';

import { IFacultyModel } from '.';

@Table
export default class FacultyModel extends Model<IFacultyModel> {
    @PrimaryKey
    @Column({
        type: DataType.NUMBER,
    })
    public id!: number;

    @Column({
        type: DataType.STRING,
    })
    public name!: string;

    @ForeignKey(() => UniversityModel)
    @Column({
        type: DataType.NUMBER,
    })
    public universityId!: number;

    @BelongsTo(() => UniversityModel)
    public university!: UniversityModel;
}
