import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../database/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { User, BaseUser } from "../database/entities";
import { hash, compare } from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<BaseUser> {
        const user = await this.usersService.findOne(username);
        if (user && (await compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async signup(user: User): Promise<User> {
        const hashedPassword = await hash(user.password, 10);
        try {
            const createdUser = await this.usersService.create({
                ...user,
                password: hashedPassword
            });
            return createdUser;
        } catch (error) {
            if (error?.code === "23505") {
                throw new HttpException(
                    "User with that email already exists",
                    HttpStatus.BAD_REQUEST
                );
            }
            throw new HttpException(
                "Something went wrong",
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
