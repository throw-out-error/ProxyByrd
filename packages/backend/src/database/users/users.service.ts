import { Injectable, Inject } from "@nestjs/common";
import { User } from "../entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {}

    async findOne(username: string): Promise<User | undefined> {
        return await this.usersRepository.findOne({ username });
    }

    async create(user: User): Promise<User | undefined> {
        await this.usersRepository.insert(user);
        return this.findOne(user.username);
    }

    async findAll(): Promise<User[]> {
        return await this.usersRepository.find({});
    }
}
