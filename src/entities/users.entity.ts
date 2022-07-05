// Users Entity
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    Unique,
    OneToMany,
    OneToOne
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Vehicles } from './vehicles.entities';
import { Rentals } from './rentals.entity';
import { Images } from './images.entity';
import { Places } from './places.entity';

@Entity('users')
@Unique(['email', 'username'])
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    salt: string;

    @Column()
    password: string;

    @Column({ nullable: true, default: null })
    passRequestToken: string;

    @Column({ nullable: true, default: null })
    passRequestTokenExpiryDate: Date;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

    // Relations
    // Vehicles
    @OneToMany(() => Vehicles, vehicle => vehicle.user, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    vehicle: Vehicles[];

    // Rentals
    @OneToMany(() => Rentals, rental => rental.user, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    rental: Rentals[];

    // Images
    @OneToOne(() => Images, image => image.user, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    image: Images;

    // Places
    @OneToOne(() => Places, place => place.user, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    place: Places;

    // Functions
    // Validate user password with bcrypt
    async validatePassword(password: string): Promise<boolean> { return await bcrypt.hash(password, this.salt) === this.password; }

    // Hash password
    async hashPassword(password: string, salt: string) { return await bcrypt.hash(password, salt); }

    //Delete sensitive data
    async deleteSensitiveData(keys: string[]): Promise<void> { keys.forEach(key => delete this[key]); }

    // Token generator for user
    async generateToken(tokenLenght: number): Promise<string> {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let token = '';
        for (let i = 0; i < tokenLenght; i++) token += chars[Math.floor(Math.random() * chars.length)];
        return token;
    }
}