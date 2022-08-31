// Vehicles Entity
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, Unique } from 'typeorm'
import { Users } from './users.entity'
import { Rentals } from './rentals.entity'
import { Colors } from './colors.entity'
import { Fuels } from './fuels.entity'
import { Images } from './images.entity'
import { Models } from './models.entity'
@Entity('vehicles')
@Unique(['licence_plate', 'vin'])
export class Vehicles extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('integer')
    seats: number

    @Column()
    shifter: string

    @Column('float')
    horsepower: number

    @Column('float')
    torque: number

    @Column('float')
    acceleration: number

    @Column()
    year: string

    @Column('float')
    price: number

    @Column('integer')
    rent_duration: number

    @Column()
    licence_plate: string

    @Column()
    vin: string

    @Column()
    userId: string

    @Column()
    imageUrl: string

    @Column()
    modelId: string

    @Column()
    colorId: string

    @Column()
    fuelId: string

    @Column()
    created_at: Date

    @Column()
    updated_at: Date

    // Relations
    // Users
    @ManyToOne(() => Users, user => user.vehicle, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    user: Users

    // Models
    @ManyToOne(() => Models, model => model.vehicle, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    model: Models

    // Rentals
    @OneToMany(() => Rentals, rental => rental.vehicle, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    rental: Rentals[]

    // Colors
    @ManyToOne(() => Colors, color => color.vehicle, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    color: Colors

    //Fuels
    @ManyToOne(() => Fuels, fuel => fuel.vehicle, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    fuel: Fuels
}