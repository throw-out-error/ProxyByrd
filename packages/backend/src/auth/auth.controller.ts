import {
    Controller,
    Request,
    Post,
    UseGuards,
    Body,
    Get
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { BaseUser, User } from "../database/entities";
import { Auth } from "./auth.decorator";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard("local"))
    @Post("login")
    async login(@Request() req): Promise<BaseUser> {
        return this.authService.login(req.user);
    }

    @Post("signup")
    async signup(@Body() user: User): Promise<BaseUser> {
        return this.authService.signup(user);
    }

    @Auth()
    @Get("profile")
    async getProfile(@Request() req) {
        return req.user;
    }
}
