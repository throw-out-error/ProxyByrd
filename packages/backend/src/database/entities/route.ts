import { BaseEntity } from "./base";
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Site } from "./site";

export interface ITargetOptions {
    webroot?: string;
    proxyUri?: string;
}

@Entity()
export class Route implements BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;
    @Column({ default: new Date().toISOString() })
    @ApiProperty()
    createdAt: string;
    @Column({ default: new Date().toISOString() })
    @ApiProperty()
    updatedAt: string;
    @ManyToOne(
        () => Site,
        site => site.routes
    )
    site: Site;

    @ApiProperty()
    @Column()
    source: string;
    @ApiProperty()
    @Column("json")
    target: ITargetOptions;
    @ApiProperty()
    @Column()
    proxyUri?: string;
    @ApiProperty()
    @Column()
    ssl: boolean;
    @ApiProperty()
    @Column()
    email: string;
    @ApiProperty()
    @Column("json")
    auth?: string[] | string;
}
