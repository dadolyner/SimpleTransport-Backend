// Users Entity
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    Unique,
    OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Vehicles } from './vehicles.entities';
import { Rentals } from './rentals.entity';

@Entity('users')
@Unique(['email'])
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
    salt: string;

    @Column()
    password: string;

    @Column()
    avatar: string;

    @Column({ nullable: true, default: null })
    passRequestToken: string;

    @Column({ nullable: true, default: null })
    passRequestTokenExpiryDate: string;

    // Relations
    // Vehicles
    @OneToMany(() => Vehicles, vehicle => vehicle.user, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    vehicle: Vehicles[];

    // Location
    @OneToMany(() => Rentals, rental => rental.user, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' })
    rental: Rentals[];

    // Functions
    // Validate user password with bcrypt
    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

    // Hash password
    async hashPassword(password: string, salt: string) {
        return await bcrypt.hash(password, salt);
    }

    //Delete sensitive data
    deleteSensitiveData(keys: string[]) {
        keys.forEach(key => delete this[key]);
    }

    // Token generator for user
    generateToken(tokenLenght: number): string {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let token = '';
        for (let i = 0; i < tokenLenght; i++) token += chars[Math.floor(Math.random() * chars.length)];

        return token;
    }
}