import { BaseEntity } from "./base";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    JoinColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Route } from "./route";

/**
 * User with password
 */

@Entity()
export class Site implements BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;
    @Column({ default: new Date().toISOString() })
    @ApiProperty()
    createdAt: string;
    @Column({ default: new Date().toISOString() })
    @ApiProperty()
    updatedAt: string;

    @ApiProperty()
    @Column()
    source: string;
    @JoinColumn()
    @OneToMany(
        () => Route,
        route => route.site
    )
    routes: Route[];
}
