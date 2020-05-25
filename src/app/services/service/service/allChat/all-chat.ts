import { Observable } from 'rxjs';
import { Project } from 'src/app/class/project/project';
import { AllChat as ac } from 'src/app/class/allChat/all-chat';
export interface AllChat {
    writeMessage(chat: ac): void;
    getMessage(project:Project): Observable<any[]>;
    deleteChatMesage(project:Project): Promise<void>;
}
