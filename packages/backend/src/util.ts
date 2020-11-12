export interface IResponse {
    status: boolean;
    message: string;
    error?: Error;
}

export interface ProxyByrdConfig {
    DB_DEBUG: boolean;
    DB_HOST: string;
    DB_USER: string;
    DB_PASS: string;
    DB_NAME: string;
    DB_PORT: string;
    JWT_SECRET: string;
}
