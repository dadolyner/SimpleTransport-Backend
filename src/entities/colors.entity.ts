// Colors Entity
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, Unique } from 'typeorm';
import { Vehicles } from './vehicles.entities';
@Entity('colors')
@Unique(['color'])
export class Colors extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    color: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    // Relations
    // Vehicles
    @OneToMany(() => Vehicles, vehicle => vehicle.color, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    vehicle: Vehicles[];
}