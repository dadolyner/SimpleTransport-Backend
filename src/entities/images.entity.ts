// Images Entity
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToOne,
} from 'typeorm';
import { Vehicles } from './vehicles.entities';
import { Users } from './users.entity';

@Entity('images')
export class Images extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    url: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    // Relations
    // Users
    @OneToOne(() => Users, user => user.rental, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    user: Users;

    // Vehicles
    @OneToOne(() => Vehicles, vehicle => vehicle.rental, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    vehicle: Vehicles;
}