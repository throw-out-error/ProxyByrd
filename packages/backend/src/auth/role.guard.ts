import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    CanActivate
} from "@nestjs/common";
import { User } from "../database/entities";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>(
            "roles",
            context.getHandler()
        );
        const user: User = context.switchToHttp().getRequest().user;

        if (!roles) return true;

        if (
            user &&
            user.roles &&
            roles.every((r: string) => user.roles.includes(r))
        )
            return true;
        throw new UnauthorizedException();
    }
}
