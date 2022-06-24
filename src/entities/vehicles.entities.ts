// Vehicles Entity
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
    ManyToOne,
} from 'typeorm';
import { Users } from './users.entity';
import { Rentals } from './rentals.entity';

@Entity('vehicles')
export class Vehicles extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    avalible: boolean;

    @Column()
    image: string;

    @Column()
    name: string;

    @Column()
    seats: number;

    @Column()
    shifter: string;

    @Column()
    horsepower: number;

    @Column()
    torque: number;

    @Column()
    speed: number;

    @Column()
    fuel: string;

    @Column()
    location: string;

    @Column()
    price: number;

    @Column()
    duration: number;

    // Relations
    // Users
    @ManyToOne(() => Users, user => user.vehicle, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    user: Users;

    // Rentals
    @OneToMany(() => Rentals, rental => rental.vehicle, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    rental: Rentals[];
}