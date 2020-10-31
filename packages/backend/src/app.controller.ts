import { Controller, Get } from "@nestjs/common";
import { IResponse } from "./util";

@Controller()
export class AppController {
    @Get("/status")
    getStatus(): IResponse {
        return {
            message: "Hello world! This is a ProxyByrd API.",
            status: true
        };
    }
}
