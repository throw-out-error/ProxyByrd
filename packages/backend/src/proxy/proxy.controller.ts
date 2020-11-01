import { Controller, Request, Post, Body, Get } from "@nestjs/common";
import { Site } from "../database/entities";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Auth } from "../auth/auth.decorator";

@Controller("site")
export class ProxyController {
    constructor(
        @InjectRepository(Site) private siteRepository: Repository<Site>
    ) {}

    @Auth("admin")
    @Get()
    async getSite(): Promise<Site[]> {
        return this.siteRepository.find();
    }

    @Auth("admin")
    @Post()
    async createSite(@Body() site: Site): Promise<Site> {
        await this.siteRepository.insert(site);
        return this.siteRepository.findOne({ source: site.source });
    }
}
