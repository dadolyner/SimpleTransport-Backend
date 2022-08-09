// Models Entity
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToOne,
} from 'typeorm';
import { Brands } from './brands.entity';

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
    @OneToOne(() => Brands, brand => brand.model, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    brand: Brands;
}