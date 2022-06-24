// Rentals Entity
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
} from 'typeorm';
import { Vehicles } from './vehicles.entities';
import { Users } from './users.entity';

@Entity('rentals')
export class Rentals extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @Column()
    vehicle_id: string;

    // Relations
    // Users
    @ManyToOne(() => Users, user => user.rental, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    user: Users;

    // Vehicles
    @ManyToOne(() => Vehicles, vehicle => vehicle.rental, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    vehicle: Vehicles;
}