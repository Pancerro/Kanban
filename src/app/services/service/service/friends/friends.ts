import { MyFriend } from 'src/app/class/myFriend/my-friend';
import { ChatWithFriend } from 'src/app/class/chatWithFriend/chat-with-friend';
import { NewMessage } from 'src/app/class/newMessage/new-message';
import { Invities } from 'src/app/class/invities/invities';
import { Observable } from 'rxjs';
import { AllUser } from 'src/app/class/allUser/all-user';

export interface Friends {
    writeMyFriends(myFriend: MyFriend): void
    writeMessageToFriends(chatWithFriend: ChatWithFriend): void
    getMessageWitchFriend(myId: string, friendsEmail: string): Observable<any[]>;
    newMessage(newMessage: NewMessage): void;
    deleteNewMesage(friendsId: string, myEmail: string): void;
    getNewMassage(myId: string): Observable<any[]>;
    deleteAllMessage(invities:Invities,myEmail: string): void;
    updateAccept(friendsId: string, email: string): Promise<void>;
    sendInvities(invities: Invities): void
    getInvities(userId: string): Observable<any[]>;
    acceptInvities(invities: Invities, myEmail: string): void;
    dontAcceptInvities(invities: Invities, myEmail: string): void;
    removeInvities(user: AllUser): Promise<void>;
    deleteFriends(user: AllUser): Promise<void>;
    getAllMyFriends(userId: string): Observable<any[]>;
}
