import { BaseEntity } from "./base";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

/**
 * User without password
 */
export interface BaseUser extends BaseEntity {
    username: string;
    email: string;
    roles: string[];
}

/**
 * User with password
 */

@Entity()
export class User implements BaseUser {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;
    @Column({ default: new Date().toISOString() })
    @ApiProperty()
    createdAt: string;
    @Column({ default: new Date().toISOString() })
    @ApiProperty()
    updatedAt: string;
    @Column({ unique: true })
    @ApiProperty()
    username: string;
    @Column({ default: "admin@example.com" })
    @ApiProperty()
    email: string;
    @Column()
    @ApiProperty()
    password: string;
    @Column("json")
    @ApiProperty()
    roles: string[];
}
