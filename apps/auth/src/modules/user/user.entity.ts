import { 
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Injectable } from '@nestjs/common';

import { IUserEntity } from './types';
import SettingEntity from '../setting/setting.entity';
import RoleEntity from '../role/role.entity';
import FavoriteEntity from '../favorite/favorite.entity';
import ContactEntity from '../contact/contact.entity';

@Injectable()
@Entity('user')
export default class UserEntity implements IUserEntity {
  @PrimaryColumn()
  public username!: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  public password!: string;

  @Column({
    type: 'bool',
    nullable: false,
    default: false,
  })
  public verified!: boolean;

  @OneToMany(_ => SettingEntity, setting => setting.user)
  public settings!: SettingEntity[];

  @ManyToMany(_ => RoleEntity, {
      cascade: ['update'],
  })
  @JoinTable({
      name: 'user_role',
  })
  public roles!: RoleEntity[];

  @ManyToMany(_ => FavoriteEntity, {
      cascade: ['update'],
  })
  @JoinTable({
      name: 'user_favorite',
  })
  public favorites!: FavoriteEntity[];

  @OneToMany(_ => ContactEntity, contact => contact.user)
  public contacts!: ContactEntity[];
}
