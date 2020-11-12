import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { RoleGuard } from "./role.guard";

export function Auth(...roles: string[]) {
    return applyDecorators(
        SetMetadata("roles", roles),
        UseGuards(AuthGuard("jwt"), RoleGuard),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({ description: "Unauthorized" })
    );
}
