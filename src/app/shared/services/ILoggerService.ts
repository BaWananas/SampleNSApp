/**
 * Logging service.
 *
 * Duplication of @arhs/core logger - Will be replaced in the future.
 */
export interface ILoggerService {
    /**
     * Emit a debugging log.
     * @param caller Emitter of the log.
     * @param message Log message.
     */
    debug(caller: any, message: string): void;
    /**
     * Emit an informational log.
     * @param caller Emitter of the log.
     * @param message Log message.
     */
    info(caller: any, message: string): void;
    /**
     * Emit a warning log.
     * @param caller Emitter of the log.
     * @param message Log message.
     */
    warn(caller: any, message: string): void;
    /**
     * Emit an error log.
     * @param caller Emitter of the log.
     * @param message Log message.
     */
    error(caller: any, message: string): void;
}
