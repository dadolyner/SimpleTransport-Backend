// Postals Entity
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, Unique } from 'typeorm'
import { Places } from './places.entity'
@Entity('postals')
@Unique(['post_code'])
export class Postals extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    post_office: string

    @Column()
    post_code: string

    @Column()
    created_at: Date

    @Column()
    updated_at: Date

    // Relations
    // Places
    @OneToMany(() => Places, place => place.postal, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    place: Places[]
}