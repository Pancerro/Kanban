import { Log as Logi } from 'src/app/class/log/log';
import {Observable} from 'rxjs';

export interface Log {
  logSave(log: Logi): void;
  getLogs(userId: string): Observable<Logi[]>;
}
