import { Injectable } from '@angular/core';
import {ILoggerService} from '@src/app/shared/services/ILoggerService';

@Injectable({
  providedIn: 'root'
})
export class LoggerService implements ILoggerService {

  constructor() {}

  debug(caller: any, message: string): void {
    this.log('DEBUG', caller.constructor.name, message);
  }

  error(caller: any, message: string): void {
    this.log('ERROR', caller.constructor.name, message);
  }

  info(caller: any, message: string): void {
    this.log('INFO', caller.constructor.name, message);
  }

  warn(caller: any, message: string): void {
    this.log('WARN', caller.constructor.name, message);
  }

  private log(level: string, location: string, message: string): void {
    console.log('[' + new Date().toLocaleString() + '] - ' + level + ' - ' +  location + ' : ' + message);
  }


}
