// Places Entity
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToOne,
    OneToMany,
} from 'typeorm';
import { Countries } from './countries.entity';
import { Postals } from './postals.entity';
import { Users } from './users.entity';

@Entity('places')
export class Places extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    place: string;

    @Column()
    postalId: string;

    @Column()
    countryId: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    // Relations
    // Postals
    @OneToOne(() => Postals, postal => postal.place, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    postal: Postals;

    // Countries
    @OneToOne(() => Countries, country => country.place, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    country: Countries;

    // Users
    @OneToMany(() => Users, user => user.place, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    user: Users[];
}