import { Injectable } from '@angular/core';
import {ILoggerService} from '@src/app/shared/services/ILoggerService';

/**
 * Implementation of {@link ILoggerService}.
 */
@Injectable({
  providedIn: 'root'
})
export class LoggerService implements ILoggerService {

  /**
   * Constructor.
   */
  constructor() {}

  /**
   * Format and emit a log.
   * @param level Log level.
   * @param location Log emitter.
   * @param message Log message.
   */
  private static formatLog(level: string, location: string, message: string): string {
    return '[' + new Date().toLocaleString() + '] - ' + level + ' - ' +  location + ' : ' + message;
  }

  /**
   * Refers to {@link ILoggerService}
   * @param caller
   * @param message
   */
  debug(caller: any, message: string): void {
    console.log(LoggerService.formatLog('DEBUG', caller.constructor.name, message));
  }

  /**
   * Refers to {@link ILoggerService}
   * @param caller
   * @param message
   */
  error(caller: any, message: string): void {
    console.error(LoggerService.formatLog('ERROR', caller.constructor.name, message));
  }

  /**
   * Refers to {@link ILoggerService}
   * @param caller
   * @param message
   */
  info(caller: any, message: string): void {
    console.log(LoggerService.formatLog('INFO', caller.constructor.name, message));
  }

  /**
   * Refers to {@link ILoggerService}
   * @param caller
   * @param message
   */
  warn(caller: any, message: string): void {
    console.warn(LoggerService.formatLog('WARN', caller.constructor.name, message));
  }

}
