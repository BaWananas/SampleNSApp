import { Injectable } from '@angular/core';
import {ILoggerService} from '@src/app/shared/services/ILoggerService';

@Injectable({
  providedIn: 'root'
})
export class LoggerService implements ILoggerService {

  constructor() {}

  private static formatLog(level: string, location: string, message: string): string {
    return '[' + new Date().toLocaleString() + '] - ' + level + ' - ' +  location + ' : ' + message;
  }

  debug(caller: any, message: string): void {
    console.log(LoggerService.formatLog('DEBUG', caller.constructor.name, message));
  }

  error(caller: any, message: string): void {
    console.error(LoggerService.formatLog('ERROR', caller.constructor.name, message));
  }

  info(caller: any, message: string): void {
    console.log(LoggerService.formatLog('INFO', caller.constructor.name, message));
  }

  warn(caller: any, message: string): void {
    console.warn(LoggerService.formatLog('WARN', caller.constructor.name, message));
  }

}
