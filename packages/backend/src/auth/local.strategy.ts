import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { BaseUser } from "../database/entities";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ passReqToCallback: true });
    }

    async validate(username: string, password: string): Promise<BaseUser> {
        const user = await this.authService.validateUser(username, password);
        if (!user) throw new UnauthorizedException();

        return user;
    }
}
