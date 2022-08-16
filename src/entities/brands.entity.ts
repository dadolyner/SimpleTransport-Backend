// Brands Entity
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne, Unique } from 'typeorm'
import { Countries } from './countries.entity'
import { Models } from './models.entity'
@Entity('brands')
@Unique(['brand'])
export class Brands extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    brand: string

    @Column()
    countryId: string

    @Column()
    created_at: Date

    @Column()
    updated_at: Date

    // Relations
    // Countries
    @ManyToOne(() => Countries, country => country.brand, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    country: Countries

    // Models
    @OneToMany(() => Models, model => model.brand, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    model: Models[]
}