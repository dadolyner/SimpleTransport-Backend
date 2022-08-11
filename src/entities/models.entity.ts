// Models Entity
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToOne,
} from 'typeorm';
import { Brands } from './brands.entity';
import { Vehicles } from './vehicles.entities';

@Entity('models')
export class Models extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    model: string;

    @Column()
    brandId: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    // Relations
    // Brands
    @ManyToOne(() => Brands, brand => brand.model, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    brand: Brands;

    // Vehicles
    @ManyToOne(() => Vehicles, vehicle => vehicle.model, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    vehicle: Vehicles;
}