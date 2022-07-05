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
    rent_start: Date;

    @Column()
    rent_end: Date;

    @Column()
    userId: string;

    @Column()
    vehicleId: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    // Relations
    // Users
    @ManyToOne(() => Users, user => user.rental, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    user: Users;

    // Vehicles
    @ManyToOne(() => Vehicles, vehicle => vehicle.rental, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    vehicle: Vehicles;
}