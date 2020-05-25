import { Observable } from 'rxjs';
import { AllUser as au } from 'src/app/class/allUser/all-user';

export interface AllUser {
    writeUser(user: au): void;
    getAllUser(): Observable<any[]>;
    remove(email: string): Promise<void>;
    updateOnline(user: au): Promise<void>
}
