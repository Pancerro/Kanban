import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/database/database.service';
import { AllUser } from 'src/app/class/allUser/all-user';
import { MyFriend } from 'src/app/class/myFriend/my-friend';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';
import { Invities } from 'src/app/class/invities/invities';
import { Log } from 'src/app/class/log/log';
import { DeleteOptionComponent } from 'src/app/modal/delete-option/delete-option.component';
import { ChatWithFriend } from 'src/app/class/chatWithFriend/chat-with-friend';
import { NewMessage } from 'src/app/class/newMessage/new-message';
import { Subscription } from 'rxjs';
import { Show } from 'src/app/class/show/show';


@Component({
  selector: 'app-friends-chat',
  templateUrl: './friends-chat.component.html',
  styleUrls: ['./friends-chat.component.css']
})
export class FriendsChatComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  public show: Show[] = [new Show("Show", false), new Show("Show", false), new Show("Show", false)];
  public rEmail: string;
  public email: string;
  public userId: string;
  public allUser: AllUser[] = [];
  public myInvities: Invities[] = [];
  public myMessageWitchFriend: ChatWithFriend[] = [];
  private myFriend: MyFriend[] = [];
  private audioNewMessage = new Audio();
  private notifacation: number = 0;
  private notifacationMessage: number = 0;
  private newMess: NewMessage[] = [];
  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private db: DataService,
    private titleService: Title) {
    this.rEmail = db.replece(auth.getUser().email);
    this.userId = auth.getUser().uid;
    this.email = auth.getUser().email;
  }

  ngOnInit(): void {
    this.audioNewMessage.src = "assets/2.mp3";
    this.audioNewMessage.load();
    this.subscription.add(this.db.getAllUser().subscribe((allUser: AllUser[]) => {
      this.allUser = allUser;
    }));
    this.subscription.add(this.db.getAllMyFriends(this.userId).subscribe((myFriend: MyFriend[]) => {
      this.myFriend = myFriend;
    }));
    this.subscription.add(this.db.getNewMassage(this.userId).subscribe((newMessage: NewMessage[]) => {
      this.newMess = newMessage;
      if (newMessage.length > 0) {
        this.titleService.setTitle("(" + newMessage.length + ") " + this.checkEmail(newMessage[newMessage.length - 1]) + " sent you a message");
        if (newMessage.length >= this.notifacationMessage) {
          this.audioNewMessage.play();
          this.notifacationMessage = newMessage.length;
        }
      } else this.titleService.setTitle(this.db.kanban);
    }));
    this.subscription.add(this.db.getInvities(this.userId).subscribe((invities: Invities[]) => {
      this.myInvities = invities;
      if (invities.length == 0) this.titleService.setTitle(this.db.kanban);
      else this.titleService.setTitle(this.db.kanban + " (" + invities.length + ") invitations");
      if (this.notifacation < invities.length) {
        this.audioNewMessage.play();
        this.notifacation = invities.length - 1;
      }
    }));
  };
  public removeFriend(friend: { email: string; userId: string; }): void {
    const dialogRef = this.dialog.open(DeleteOptionComponent, {
      width: '250px',
      height: '150px',
      data: { name: this.inreplece(friend.email) },
      panelClass: 'no-padding-dialog'
    });
    dialogRef.afterClosed().subscribe(anwser => {
      if (anwser == true) {
        this.db.deleteFriends(new AllUser(this.userId, friend.email, null));
        this.db.deleteFriends(new AllUser(friend.userId, this.rEmail, null));
        this.db.deleteAllMessage(new Invities(this.userId, friend.email, friend.userId, null), this.rEmail);
        this.db.logSave(new Log(this.userId, "delete friend", "delete", "delete" + friend.email));
      }
    });
  }
  public getMyFriendMessage(email: string) {
    this.db.getMessageWitchFriend(this.userId, email).subscribe((messageWithFriend: ChatWithFriend[]) =>
      this.myMessageWitchFriend = messageWithFriend);
    this.db.deleteNewMesage(this.userId, email);
  }
  public sendMessageForFriend(message: string, formReset: { resetForm: () => void; }, id: string, email: string): void {
    this.db.writeMessageToFriends(new ChatWithFriend(this.userId, id, this.rEmail, email, null, message, this.auth.getUser().email))
    this.db.deleteNewMesage(this.userId, email);
    formReset.resetForm();
  }
  public addFriend(myFriend: string, addForm: { resetForm: () => void; }): void {
    if (this.checkUser(this.db.replece(myFriend))) {
      if (!this.checkFriend(this.db.replece(myFriend))) {
        if (myFriend != this.auth.getUser().email) {
          this.db.writeMyFriends(new MyFriend(this.userId, this.db.replece(myFriend), this.getFriendsId(this.db.replece(myFriend)), false));
          this.db.sendInvities(new Invities(this.getFriendsId(this.db.replece(myFriend)), this.rEmail, this.userId, false));
          addForm.resetForm();
          this.db.logSave(new Log(this.userId, "inv", "send", "send inv for " + myFriend));
        } else window.alert("This is your email");
      } else window.alert("This user is already your friend");
    }
    else window.alert("This email adress is incorrect, or is not in database");
  }
  public acceptInv(inv: Invities): void {
    this.db.acceptInvities(new Invities(this.userId, inv.friendsEmail, inv.friendsId, true), this.rEmail)
    this.db.logSave(new Log(this.userId, "inv", "accept", "accept inv for " + inv.friendsEmail));
  }
  public dontAcceptInv(inv: Invities): void {
    this.db.dontAcceptInvities(new Invities(this.userId, inv.friendsEmail, inv.friendsId, null), this.rEmail)
    this.db.logSave(new Log(this.userId, "inv", "dont-accept", "dont-accept inv for " + inv.friendsEmail));
  }
  public checkUser(email: string): boolean {
    for (let user of this.allUser) {
      if (user.email == email) {
        return true;
      }
    }
    return false;
  }
  public checkFriend(email: string): boolean {
    for (let item of this.myFriend) {
      if (item.friendsEmail == email) {
        if (item.friendsEmail == this.db.replece(this.rEmail)) return false
        return true;
      }
    }
    return false;
  }
  private getFriendsId(email: string): string {
    for (let user of this.allUser) {
      if (user.email == email) {
        return user.userId;
      }
    }
    return null;
  }
  public changeStatus(email: string): void {
    this.db.updateOnline(new AllUser(null, email, !this.checkStatus(email)));
  }
  public checkStatus(email: string): boolean {
    for (let user of this.allUser) {
      if (user.email == email) {
        if (user.online) return true;
        else return false;
      }
    } return false;
  }
  public checkAccept(email: string): boolean {
    for (let item of this.myFriend) {
      if (item.friendsEmail == email) {
        if (item.accept) return true;
        else return false;
      }
    }
    return false;
  }
  public checkLength(email: string): string {
    if (email.length > 20) {
      return email.substr(0, email.length / 2) + "\n" + email.substr(email.length / 2, email.length);
    }
    return email
  }

  public checkByNewMessage(email: string) {
    for (let newMess of this.newMess) {
      if (newMess.email == email) return "(+1)";
    }
  }
  private checkEmail(email: NewMessage): string {
    for (let mail of this.myFriend) {
      if (mail.friendsEmail == this.db.replece(email.email)) {
        return email.email;
      }
    }
  }
  public showOption(option: number): void {
    if (this.show[option].see) this.show[option] = new Show("Show", false);
    else this.show[option] = new Show("Hide", true);
  }
  public inreplece(email: string): string {
    return this.db.inreplece(email);
  }
  public dontClose($event: { stopPropagation: () => void; }): void {
    $event.stopPropagation();
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
