// Fuels Entity
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
} from 'typeorm';
import { Vehicles } from './vehicles.entities';

@Entity('fuels')
export class Fuels extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fuel: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    // Relations
    // Vehicles
    @OneToMany(() => Vehicles, vehicle => vehicle.fuel, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    vehicle: Vehicles[];
}