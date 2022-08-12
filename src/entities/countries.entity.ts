// Countries Entity
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, Unique } from 'typeorm';
import { Brands } from './brands.entity';
import { Places } from './places.entity';
@Entity('countries')
@Unique(['country', 'abbreviation'])
export class Countries extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    country: string;

    @Column()
    abbreviation: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    // Relations
    // Places
    @OneToMany(() => Places, place => place.postal, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    place: Places[];

    // Brands
    @OneToMany(() => Brands, brand => brand.country, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    brand: Brands[];
}