import { NestMiddleware } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Site } from "../database/entities/site";
import { NextFunction, Request, Response } from "express";
import httpProxy from "http-proxy";
import url from "url";
import path from "path";
import fs from "fs";
import mime from "mime";

export class ReverseProxyMiddleware implements NestMiddleware {
    constructor(
        @InjectRepository(Site) private siteRepository: Repository<Site>
    ) {}

    send404(res: Response, obj?: string): void {
        res.status(404).send(`<h1>404 ${obj} Not Found</h1>`);
    }

    async use(req: Request, res: Response): Promise<void> {
        const proxy = httpProxy.createProxyServer();
        const site = await this.siteRepository.findOne({
            source: req.get("host") ?? "example.com"
        });
        if (!site) return this.send404(res, "Site");
        const u = url.parse(req.url);
        const route = site.routes.find(r =>
            (r.source === u.pathname) === undefined ||
            u.pathname === null ||
            u.pathname === ""
                ? "/"
                : u.pathname
        );
        // console.log(route);
        if (!route) return this.send404(res);
        if (route.target.webroot) {
            let loc = u.pathname ?? "index/";
            if (u.pathname === "/" || u.pathname === "") loc = "index";
            if (!loc.match(/\.[0-9a-z]+$/i)) loc = loc + ".html";
            console.log(loc);
            const safePath = path.normalize(loc);
            const filePath = path.join(route.target.webroot, safePath);
            // console.log(filePath);
            const exists = fs.existsSync(filePath);
            if (exists) {
                res.setHeader(
                    "Content-Type",
                    mime.getType(filePath) ?? "text/html"
                );
                return res.sendFile(filePath);
            } else {
                if (fs.existsSync(filePath + ".html"))
                    return res.sendFile(filePath + ".html");
                else return this.send404(res, "File");
            }
        } else {
            if (!route.target.proxyUri) return this.send404(res, "Proxy URI");
            return proxy.web(
                req,
                res,
                {
                    target: route.target.proxyUri
                },
                err => res.status(500).send(err.toString())
            );
        }
    }
}
