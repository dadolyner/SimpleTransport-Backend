// Postals Entity
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
} from 'typeorm';
import { Places } from './places.entity';

@Entity('postals')
export class Postals extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    post_office: string;

    @Column()
    post_number: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    // Relations
    // Places
    @OneToMany(() => Places, place => place.postal, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    place: Places[];
}