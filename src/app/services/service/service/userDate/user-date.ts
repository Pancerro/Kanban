import { Observable } from 'rxjs';
import { UserDate as Ud } from 'src/app/class/userDate/user-date';
import { AngularFireDatabase } from '@angular/fire/database';
export interface UserDate {
  writeUserData(userData: Ud): void;
  getDateUser(userId: string): Observable<Ud[]>;
  updateEmail(userData: Ud):Promise<void>;
  updateThema(userData: Ud):Promise<void>;
  deleteUser(userId: string):Promise<void>;
}
