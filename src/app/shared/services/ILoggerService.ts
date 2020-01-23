export interface ILoggerService {
    debug(caller: any, message: string): void;
    info(caller: any, message: string): void;
    warn(caller: any, message: string): void;
    error(caller: any, message: string): void;
}
