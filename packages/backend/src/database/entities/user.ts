import { BaseEntity } from "./base";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

/**
 * User without password
 */
export interface BaseUser extends BaseEntity {
    username: string;
    email: string;
}

/**
 * User with password
 */

@Entity()
export class User implements BaseUser {
    @PrimaryGeneratedColumn({ type: "uuid" })
    id: string;
    @Column({ default: new Date().toISOString() })
    createdAt: string;
    @Column({ default: new Date().toISOString() })
    updatedAt: string;
    @Column()
    username: string;
    @Column()
    email: string;
    @Column()
    password: string;
}
