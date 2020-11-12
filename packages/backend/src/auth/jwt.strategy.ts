import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { BaseUser } from "src/database/entities";
import { ConfigService } from "src/config/config.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>("JWT_SECRET"),
            passReqToCallback: true
        });
    }

    async validate(payload: BaseUser) {
        return { userId: payload.id, username: payload.username };
    }
}
