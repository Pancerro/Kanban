import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/database/database.service';
import { MatDialog, MatBottomSheet } from '@angular/material';
import { AddTaskComponent } from 'src/app/modal/add-task/add-task.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { EditTaskComponent } from 'src/app/modal/edit-task/edit-task.component';
import { EditTableNameComponent } from 'src/app/modal/edit-table-name/edit-table-name.component';
import { CreateNewKanbanComponent } from 'src/app/modal/create-new-kanban/create-new-kanban.component';
import { ScrollToBottomDirective } from '../scroll-to-bottom.directive/scroll-to-bottom.directive.component';
import { DeleteOptionComponent } from 'src/app/modal/delete-option/delete-option.component';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';
import { Task } from 'src/app/class/task/task';
import { Log } from 'src/app/class/log/log';
import { TableTitle } from 'src/app/class/tableTitle/table-title';
import { NumberSeeTable } from 'src/app/class/numberSeeTable/number-see-table';
import { AllChat } from 'src/app/class/allChat/all-chat';
import { StopShareUser } from 'src/app/class/stopShareUser/stop-share-user';
import { ShareFor } from 'src/app/class/shareFor/share-for';
import { ShareFriend } from 'src/app/class/shareFriend/share-friend';
import { Project } from 'src/app/class/project/project';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css'],
})
export class DashboardsComponent implements OnInit {


  public openChat(): void {
    this._bottomSheet.open(ChatComponent, {
      data: { projectName: this.projectName, userId: this.userId }

    });
  }

  public sharingOption(): void {
    if (this.checkIfOwner()) {
      localStorage.setItem("lastTable", this.projectName);
      localStorage.setItem("share", "true");
      this.router.navigate(['/sharing-option/' + this.projectName]);
    } else window.alert("Sorry, you dont have access to sharing option")

  }
  public clear(): void {
    setInterval(() => {
      window.location.reload();
    }, 5500);

  }

  public projectName: string;
  public settingShare: boolean = false;
  public tableNameProject: Project[] = [];
  public shared: ShareFor[] = [];
  public shareFriends: ShareFriend[] = [];
  public tableTitle: TableTitle[] = [];
  public numbers: NumberSeeTable[] = [];
  public viewMessage: AllChat[] = [];
  public table0: string = "table0";
  public table1: string = "table1";
  public table2: string = "table2";
  public table3: string = "table3";
  public table4: string = "table4";
  public table5: string = "table5";
  public table6: string = "table6";
  public table7: string = "table7";
  public table8: string = "table8";
  public table9: string = "table9";
  public tableZero = [];
  public tableOne = [];
  public tableTwo = [];
  public tableThree = [];
  public tableFour = [];
  public tableFive = [];
  public tableSix = [];
  public tableSeven = [];
  public tableEight = [];
  public tableNine = [];
  public myFriend = [];
  public view = "viewer";
  public shareOption: boolean = false;
  public textShareOption: string = "Show";
  public textShare: string = "Show";
  public textShared: string = "Show";
  public textChat: string = "Hide";
  public chatButton: boolean = true;
  public shareButton: boolean = false;
  public sharedButton: boolean = false;
  public userInfo = [];
  private allUser = [];
  private deleteAudio = new Audio();
  private scroll: ScrollToBottomDirective;
  private titleTable: string;
  private userId: string;
  private endDate: Date;
  private endData: string;
  private endDataString: string;
  private word: string;
  private tabEndDate = [];
  private tableEditTitle: string;
  private deleteFromShare: StopShareUser[] = [];  
  private subscription: Subscription = new Subscription();
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  public createNewKanbanTable(): void {
    const dialogRef = this.dialog.open(CreateNewKanbanComponent, {
      width: '250px',
      height: '250px',
      data: { edit: false },
      panelClass: 'no-padding-dialog'
    });
    dialogRef.afterClosed().subscribe(newProjectName => {
      if (newProjectName != undefined) {
        if (newProjectName.invalid) {
          window.alert("Please correct all errors and resubmit add task");
          this.db.logSave(new Log(this.auth.getUser().uid, "logAddNewKanbanProjectFailed", "add new kanban project", "add new kanban project failed"));
        }
        else {
          this.db.kanban = newProjectName.name;
          if (this.checkIfProjectNameIsNotFree(this.db.replece(this.db.kanban))) {
            window.alert("This name is already taken. Please enter different one");
          }
          else {
            this.db.kanban = this.db.replece(this.db.kanban);
            this.db.writeKanbanTable(new Project(this.auth.getUser().uid, this.db.kanban, false))
            this.db.writeTitleTable(new TableTitle(this.auth.getUser().uid, "table0", "to do"));
            this.db.writeTitleTable(new TableTitle(this.auth.getUser().uid, "table1", "doing"));
            this.db.writeTitleTable(new TableTitle(this.auth.getUser().uid, "table2", "done"));
            this.db.writeTitleTable(new TableTitle(this.auth.getUser().uid, "table3", "table4"));
            this.db.writeTitleTable(new TableTitle(this.auth.getUser().uid, "table4", "table5"));
            this.db.writeTitleTable(new TableTitle(this.auth.getUser().uid, "table5", "table6"));
            this.db.writeTitleTable(new TableTitle(this.auth.getUser().uid, "table6", "table7"));
            this.db.writeTitleTable(new TableTitle(this.auth.getUser().uid, "table7", "table8"));
            this.db.writeTitleTable(new TableTitle(this.auth.getUser().uid, "table8", "table9"));
            this.db.writeTitleTable(new TableTitle(this.auth.getUser().uid, "table9", "table10"));
            this.db.writeUserNumber(new NumberSeeTable(this.auth.getUser().uid, 3));
            this.db.logSave(new Log(this.auth.getUser().uid, "logAddNewKanbanProject", "add new kanban project", "add new kanban project: " + this.db.kanban + " success"));
            this.db.kanban = localStorage.getItem("lastTable");
          }
        }
      }
    });
  }

  private checkIfProjectNameIsNotFree(projectName: string): boolean {
    for (let project of this.tableNameProject) {
      if (project.projectName == projectName) {
        return true;
      }
    }
    return false;
  }

  public seeMyProject(projectName: string): void {
    this.shareFriends = [];
    this.settingShare = false;
    this.userId = this.auth.getUser().uid;
    this.db.kanban = projectName;
    localStorage.setItem("lastTable", projectName);
    this.deleteFromShare = [];
    this.db.logSave(new Log(this.userId, "See project", "see", "See" + projectName));
    this.ngOnInit();
  }

  public removeProject(removeProject: string): void {
    const dialogRef = this.dialog.open(DeleteOptionComponent, {
      width: '250px',
      height: '150px',
      data: { name: removeProject },
      panelClass: 'no-padding-dialog'
    });
    dialogRef.afterClosed().subscribe(deleteOpt => {
      if (deleteOpt == true) {
        this.db.logSave(new Log(this.userId, "logRemoveProject", "remove project", "remove project: " + removeProject));
        this.db.removeKanbanTable(new Project(this.userId, this.db.replece(removeProject), null));
        this.db.removeKanbanTableFromProject(new Project(this.userId, this.db.replece(removeProject), null));
        if (removeProject == this.db.kanban) this.seeMyProject("kanban");
        else this.seeMyProject(this.db.kanban);
      }
    });
  }
  public editProjectName(editProjectName: string): void {
    this.db.kanban = editProjectName;
    this.ngOnInit();
    const dialogRef = this.dialog.open(CreateNewKanbanComponent, {
      width: '250px',
      height: '250px',
      data: { projectName: editProjectName, edit: true },
      panelClass: 'no-padding-dialog'
    });
    dialogRef.afterClosed().subscribe(editProject => {
      if (editProject != undefined) {
        if (editProject.invalid) {
          this.seeMyProject(localStorage.getItem("lastTable"));
          window.alert("Please correct all errors and resubmit add task");
          this.db.logSave(new Log(this.userId, "logEditNameKanbanProjectFailed", "edit name kanban project", "edit name" + editProjectName + "failed"));
        }
        else {
          this.db.kanban = editProject.name;
          if (this.checkIfProjectNameIsNotFree(this.db.kanban)) {
            this.seeMyProject(localStorage.getItem("lastTable"));
            window.alert("Its name dont free! Use next name");
          }
          else {
            this.db.logSave(new Log(this.userId, "logEditKanbanProject", "edit name kanban project", "edit name kanban project: " + this.db.kanban + " success"));
            this.db.removeKanbanTable(new Project(this.userId, this.db.replece(editProjectName), null));
            this.db.removeKanbanTableFromProject(new Project(this.userId, this.db.replece(editProjectName), null));
            localStorage.setItem("lastTable", this.db.kanban);
            this.db.writeKanbanTable(new Project(this.userId, this.db.replece(this.db.kanban), false));
            this.db.writeTitleTable(new TableTitle(this.userId, "table0", this.tableTitle[0].title));
            this.db.writeTitleTable(new TableTitle(this.userId, "table1", this.tableTitle[1].title));
            this.db.writeTitleTable(new TableTitle(this.userId, "table2", this.tableTitle[2].title));
            this.db.writeTitleTable(new TableTitle(this.userId, "table3", this.tableTitle[3].title));
            this.db.writeTitleTable(new TableTitle(this.userId, "table4", this.tableTitle[4].title));
            this.db.writeTitleTable(new TableTitle(this.userId, "table5", this.tableTitle[5].title));
            this.db.writeTitleTable(new TableTitle(this.userId, "table6", this.tableTitle[6].title));
            this.db.writeTitleTable(new TableTitle(this.userId, "table7", this.tableTitle[7].title));
            this.db.writeTitleTable(new TableTitle(this.userId, "table8", this.tableTitle[8].title));
            this.db.writeTitleTable(new TableTitle(this.userId, "table9", this.tableTitle[9].title));
            this.db.writeUserNumber(new NumberSeeTable(this.userId, this.numbers[0].number));
            this.projectName = this.db.kanban;
            this.saveChanges();
            this.ngOnInit();
            this.seeMyProject(localStorage.getItem("lastTable"));
          }
        }
      } else this.seeMyProject(localStorage.getItem("lastTable"));
    });
  }
  public shareProject(projectName: string): void {
    this.db.kanban = projectName;
    this.db.updateShare(new Project(this.auth.getUser().uid, projectName, true));
    this.db.writeShareFriends(new ShareFriend(this.auth.getUser().uid, this.db.replece(this.userInfo[0].email), this.auth.getUser().uid, "owner"));
    this.subscription.add(this.db.getDelete(this.auth.getUser().uid).subscribe((deleteUsers: StopShareUser[]) => {
      this.deleteFromShare = deleteUsers;
      for (let deleteUser of deleteUsers) {
        this.db.removeDelete(this.auth.getUser().uid, deleteUser.friendsEmail);
      }
    }));
    this.db.share(new ShareFor(this.auth.getUser().uid, this.userId, projectName));
    localStorage.setItem("lastTable", "kanban");
    this.db.kanban = localStorage.getItem("lastTable");
    this.db.logSave(new Log(this.auth.getUser().uid, "Start share", "share", "Start share project " + projectName));
    //this.ngOnInit();
    this.db.writeMessage(new AllChat(this.auth.getUser().uid, this.db.replece(this.userInfo[0].email), projectName, null, "Welcome to chat " + projectName));
  }

  public seeMyShareProject(shareProjectName: Project): void {
    this.deleteFromShare = [];
    this.settingShare = true;
    this.db.kanban = shareProjectName.projectName;
    this.userId = shareProjectName.userId;
    this.db.logSave(new Log(this.userId, "See share project", "see", "see share project " + shareProjectName.projectName));
    this.sharedInit();
    this.subscription.add(this.db.getDelete(this.userId).subscribe((deleteUsers: StopShareUser[]) => this.deleteFromShare = deleteUsers));
    this.db.getShareFriends(this.userId).subscribe((shareFriends: ShareFriend[]) => this.shareFriends = shareFriends);
    this.db.getMessage(new Project(this.userId, shareProjectName.projectName, null)).subscribe((chat: AllChat[]) => {
      this.viewMessage = chat;
    })
    this.titleService.setTitle(this.projectName);
  }

  private sharedInit(): void {
    this.projectName = this.db.kanban;
    this.subscription.add(this.db.getTask(new Task(this.userId, this.table0, null, null, null, null, null, null, null)).subscribe((tasks: Task[]) => {
      this.tableZero = tasks;
    }));
    this.subscription.add(this.db.getTask(new Task(this.userId, this.table1, null, null, null, null, null, null, null)).subscribe((tasks: Task[]) => {
      this.tableOne = tasks;
    }));
    this.subscription.add(this.db.getTask(new Task(this.userId, this.table2, null, null, null, null, null, null, null)).subscribe((tasks: Task[]) => {
      this.tableTwo = tasks;
    }));
    this.subscription.add(this.db.getTask(new Task(this.userId, this.table3, null, null, null, null, null, null, null)).subscribe((tasks: Task[]) => {
      this.tableThree = tasks;
    }));
    this.subscription.add(this.db.getTask(new Task(this.userId, this.table4, null, null, null, null, null, null, null)).subscribe((tasks: Task[]) => {
      this.tableFour = tasks;
    }));
    this.subscription.add(this.db.getTask(new Task(this.userId, this.table5, null, null, null, null, null, null, null)).subscribe((tasks: Task[]) => {
      this.tableFive = tasks;
    }));
    this.subscription.add(this.db.getTask(new Task(this.userId, this.table6, null, null, null, null, null, null, null)).subscribe((tasks: Task[]) => {
      this.tableSix = tasks;
    }));
    this.subscription.add(this.db.getTask(new Task(this.userId, this.table7, null, null, null, null, null, null, null)).subscribe((tasks: Task[]) => {
      this.tableSeven = tasks;
    }));
    this.subscription.add(this.db.getTask(new Task(this.userId, this.table8, null, null, null, null, null, null, null)).subscribe((tasks: Task[]) => {
      this.tableEight = tasks;
    }));
    this.subscription.add(this.db.getTask(new Task(this.userId, this.table9, null, null, null, null, null, null, null)).subscribe((tasks: Task[]) => {
      this.tableNine = tasks;
    }));
    this.subscription.add(this.db.getUserNumber(this.userId).subscribe((number: NumberSeeTable[]) => {
      this.numbers = number;
    }));
  }
  private delete(): string {
    for (let user of this.deleteFromShare) {
      if (this.inreplece(user.friendsEmail) == this.userInfo[0].email) return user.role;
    }
    return 'false';
  }

  public checkIfDelete(): boolean {
    if (this.delete() == "delete") {
      this.deleteAudio.play();
      return true;
    }
    else return false;
  }


  public shareOptionB(): void {
    this.shareOption = !this.shareOption;
    if (!this.shareOption) this.textShareOption = "Show";
    else this.textShareOption = "Hide";
  }


  public chatHide(): void {
    this.chatButton = !this.chatButton;
    if (!this.chatButton) this.textChat = "Show";
    else this.textChat = "Hide";
  }
  public shareHide(): void {
    this.shareButton = !this.shareButton;
    if (!this.shareButton) this.textShare = "Show";
    else this.textShare = "Hide";
  }
  public sharedHide(): void {
    this.sharedButton = !this.sharedButton;
    if (!this.sharedButton) this.textShared = "Show";
    else this.textShared = "Hide";
  }
  public checkRole() {
    for (let item of this.shareFriends) {
      if (this.inreplece(item.friendsEmail) == this.userInfo[0].email) return item.role;
    }
    return false;
  }
  public checkIfOwner(): boolean {
    if (this.checkRole() == "owner") return true;
    else return false;
  }
  public checkIfView(): boolean {
    if (this.checkRole() == "viewer") return true;
    else return false;
  }
  public choiceUserForTask(user: string, tableParent: string, tableChild: string): void {
    this.db.kanban = this.projectName;
    this.db.updateChoiceUser(new Task(this.userId, tableParent, tableChild, null, null, null, null, null, user));
  }
  public choiceText(user: string): string {
    if (user == "") return "";
    else return this.inreplece(user);
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
  private checkIfTaskTitleIsNotFree(taskTitle: string, tableName: string): boolean {
    switch (tableName) {
      case "table0": for (let item of this.tableZero) { if (item.title == taskTitle) return true; } break;
      case "table1": for (let item of this.tableOne) { if (item.title == taskTitle) return true; } break;
      case "table2": for (let item of this.tableTwo) { if (item.title == taskTitle) return true; } break;
      case "table3": for (let item of this.tableThree) { if (item.title == taskTitle) return true; } break;
      case "table4": for (let item of this.tableFour) { if (item.title == taskTitle) return true; } break;
      case "table5": for (let item of this.tableFive) { if (item.title == taskTitle) return true; } break;
      case "table6": for (let item of this.tableSix) { if (item.title == taskTitle) return true; } break;
      case "table7": for (let item of this.tableSeven) { if (item.title == taskTitle) return true; } break;
      case "table8": for (let item of this.tableEight) { if (item.title == taskTitle) return true; } break;
      case "table9": for (let item of this.tableNine) { if (item.title == taskTitle) return true; } break;
    }
  }




  public deleteShareProject(projectName: string): void {
    const dialogRef = this.dialog.open(DeleteOptionComponent, {
      width: '250px',
      height: '150px',
      data: { name: projectName },
      panelClass: 'no-padding-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.stopShareProject(projectName);
        this.db.removeKanbanTable(new Project(this.userId, this.replece(projectName), null));
        this.db.removeKanbanTableFromProject(new Project(this.userId, this.replece(projectName), null));
        this.db.logSave(new Log(this.userId, "Delete share project", "Delete", "Delete " + projectName));
        window.location.reload();
        if (projectName == this.db.kanban) this.seeMyProject("kanban");
      }
    });
  }

  public editShareProject(projectName: string): void {
    this.stopShareProject(projectName);
    this.editProjectName(projectName);
    this.shareProject(projectName);
  }
  public stopShareProject(projectName: string): void {
    this.db.deleteChatMesage(new Project(this.userId, projectName, null));
    this.db.kanban = projectName;
    this.db.getShareFriends(this.userId).subscribe(res => { this.shareFriends = res });
    for (let item of this.shareFriends) {
      if (item.friendsEmail == this.replece(this.userInfo[0].email)) console.log("")
      else this.db.writeDelete(new StopShareUser(this.userId, item.friendsEmail, item.friendsId));
      this.db.removeShare(item.friendsId, projectName);
      this.db.removeShareFriends(this.userId, item.friendsEmail);
      this.db.updateShare(new Project(this.userId, projectName, false));
    }
    this.db.kanban = localStorage.getItem("lastTable");
    this.db.logSave(new Log(this.userId, "Stop share", "share", "stop share project " + projectName));
    this.settingShare = false;
  }


  public shareTable(item: { friendsEmail: string; friendsId: string; friendsEMail: string; }, projectName: string, role: string): void {
    //edit
    this.db.kanban = projectName;
    this.db.writeShareFriends(new ShareFriend(this.userId, item.friendsEmail, item.friendsId, role));
    this.db.share(new ShareFor(item.friendsId, this.userId, projectName));
    this.db.removeDelete(this.userId, item.friendsEMail);
    this.db.kanban = localStorage.getItem("lastTable");
    this.db.logSave(new Log(this.userId, "Start share project", "share", "Start share project " + projectName + " for " + item.friendsEmail));
  }
  public checkShare(email: string, projectName: string): boolean {
    this.db.kanban = projectName;
    for (let item of this.shareFriends) {
      if (item.friendsEmail == email) {
        this.db.kanban = localStorage.getItem("lastTable");
        return true;
      }
    }
    this.db.kanban = localStorage.getItem("lastTable")
    return false;
  }

  public stopShare(friends: { friendsEmail: string; friendsId: string; }, projectName: string): void {
    this.db.kanban = projectName;
    this.db.removeShareFriends(this.userId, friends.friendsEmail);
    this.db.writeDelete(new StopShareUser(this.userId, friends.friendsEmail, friends.friendsId));
    this.db.removeShare(friends.friendsId, projectName);
    this.db.kanban = localStorage.getItem("lastTable");
    this.db.logSave(new Log(this.userId, "Stop share project", "share", "Stop share project " + projectName + " for " + friends.friendsEmail));
  }
  public sendMessage(message: string, formReset: { resetForm: () => void; }): void {
    this.db.kanban = this.projectName;
    this.db.writeMessage(new AllChat(this.userId, this.userInfo[0].email, this.db.kanban, null, message));
    this.db.getMessage(new Project(this.userId, this.projectName, null)).subscribe(res => this.viewMessage = res);
    formReset.resetForm();
    this.db.logSave(new Log(this.userId, "Send message", "chat", "send message"));
  }

  ngOnInit() {
    this.db.getTask(new Task(this.userId, "table", null, null, null, null, null, null, null)).subscribe(res => {
      this.tableTitle = res;
    });
    // if (localStorage.getItem("share")) this.settingShare = true;
    this.deleteAudio.src = "assets/1.mp3";
    this.deleteAudio.load();
    localStorage.setItem("menu", "KanbanTable");
    this.db.getShare(this.userId).subscribe(res => {
      this.shared = res;
    })
    if (localStorage.getItem("lastTable") == null) {
      localStorage.setItem("lastTable", "kanban");
      this.db.kanban = localStorage.getItem("lastTable");
    }
    this.db.getTask(new Task(this.userId, this.table0, null, null, null, null, null, null, null)).subscribe(res => {
      this.tableZero = res;
    });
    this.db.getTask(new Task(this.userId, this.table1, null, null, null, null, null, null, null)).subscribe(res => {
      this.tableOne = res;
    });
    this.db.getTask(new Task(this.userId, this.table2, null, null, null, null, null, null, null)).subscribe(res => {
      this.tableTwo = res;
    });
    this.db.getTask(new Task(this.userId, this.table3, null, null, null, null, null, null, null)).subscribe(res => {
      this.tableThree = res;
    });
    this.db.getTask(new Task(this.userId, this.table4, null, null, null, null, null, null, null)).subscribe(res => {
      this.tableFour = res;
    });
    this.db.getTask(new Task(this.userId, this.table5, null, null, null, null, null, null, null)).subscribe(res => {
      this.tableFive = res;
    });
    this.db.getTask(new Task(this.userId, this.table6, null, null, null, null, null, null, null)).subscribe(res => {
      this.tableSix = res;
    });
    this.db.getTask(new Task(this.userId, this.table7, null, null, null, null, null, null, null)).subscribe(res => {
      this.tableSeven = res;
    });
    this.db.getTask(new Task(this.userId, this.table8, null, null, null, null, null, null, null)).subscribe(res => {
      this.tableEight = res;
    });
    this.db.getTask(new Task(this.userId, this.table9, null, null, null, null, null, null, null)).subscribe(res => {
      this.tableNine = res;
    });
    this.db.getUserNumber(this.userId).subscribe(res => {
      this.numbers = res;
    });
    this.db.getDateUser(this.userId).subscribe(res => {
      this.userInfo = res;
    });
    this.db.getKanbanTable(this.userId).subscribe(res => {
      this.tableNameProject = res;
    });
    this.db.getAllUser().subscribe(res => {
      this.allUser = res
    })
    this.db.getAllMyFriends(this.userId).subscribe(res => {
      this.myFriend = res;
    })
    this.projectName = this.db.kanban;

  }


  constructor(
    private auth: AuthService,
    private db: DataService,
    public dialog: MatDialog,
    private router: Router,
    private titleService: Title,
    private _bottomSheet: MatBottomSheet
  ) {
    this.userId = auth.getUser().uid;
  }

  public addNewTable(): void {
    this.db.kanban = this.projectName;
    switch (this.numbers[0].number) {
      case 0: this.updateTableTitle(this.table0, true); this.db.logSave(new Log(this.userId, "logAddNewTable", "add new table", this.table0)); break;
      case 1: this.updateTableTitle(this.table1, true); this.db.logSave(new Log(this.userId, "logAddNewTable", "add new table", this.table1)); break;
      case 2: this.updateTableTitle(this.table2, true); this.db.logSave(new Log(this.userId, "logAddNewTable", "add new table", this.table2)); break;
      case 3: this.updateTableTitle(this.table3, true); this.db.logSave(new Log(this.userId, "logAddNewTable", "add new table", this.table3)); break;
      case 4: this.updateTableTitle(this.table4, true); this.db.logSave(new Log(this.userId, "logAddNewTable", "add new table", this.table4)); break;
      case 5: this.updateTableTitle(this.table5, true); this.db.logSave(new Log(this.userId, "logAddNewTable", "add new table", this.table5)); break;
      case 6: this.updateTableTitle(this.table6, true); this.db.logSave(new Log(this.userId, "logAddNewTable", "add new table", this.table6)); break;
      case 7: this.updateTableTitle(this.table7, true); this.db.logSave(new Log(this.userId, "logAddNewTable", "add new table", this.table7)); break;
      case 8: this.updateTableTitle(this.table8, true); this.db.logSave(new Log(this.userId, "logAddNewTable", "add new table", this.table8)); break;
      case 9: this.updateTableTitle(this.table9, true); this.db.logSave(new Log(this.userId, "logAddNewTable", "add new table", this.table9)); break;
    }
  }
  public deleteLastTable(): void {
    this.db.kanban = this.projectName;
    this.numbers[0].number--;
    switch (this.numbers[0].number) {
      case 0: this.db.removeTable(new TableTitle(this.userId, null, this.table0));
        this.db.logSave(new Log(this.userId, "logDeleteLastTable", "delete table", this.table0)); this.db.writeTitleTable(new TableTitle(this.userId, this.table0, "table1")); break;
      case 1: this.db.removeTable(new TableTitle(this.userId, null, this.table1));
        this.db.logSave(new Log(this.userId, "logDeleteLastTable", "delete table", this.table1)); this.db.writeTitleTable(new TableTitle(this.userId, this.table1, "table2")); break;
      case 2: this.db.removeTable(new TableTitle(this.userId, null, this.table2));
        this.db.logSave(new Log(this.userId, "logDeleteLastTable", "delete table", this.table2)); this.db.writeTitleTable(new TableTitle(this.userId, this.table2, "table3")); break;
      case 3: this.db.removeTable(new TableTitle(this.userId, null, this.table3));
        this.db.logSave(new Log(this.userId, "logDeleteLastTable", "delete table", this.table3)); this.db.writeTitleTable(new TableTitle(this.userId, this.table3, "table4")); break;
      case 4: this.db.removeTable(new TableTitle(this.userId, null, this.table4));
        this.db.logSave(new Log(this.userId, "logDeleteLastTable", "delete table", this.table4)); this.db.writeTitleTable(new TableTitle(this.userId, this.table4, "table5")); break;
      case 5: this.db.removeTable(new TableTitle(this.userId, null, this.table5));
        this.db.logSave(new Log(this.userId, "logDeleteLastTable", "delete table", this.table5)); this.db.writeTitleTable(new TableTitle(this.userId, this.table5, "table6")); break;
      case 6: this.db.removeTable(new TableTitle(this.userId, null, this.table6));
        this.db.logSave(new Log(this.userId, "logDeleteLastTable", "delete table", this.table6)); this.db.writeTitleTable(new TableTitle(this.userId, this.table6, "table7")); break;
      case 7: this.db.removeTable(new TableTitle(this.userId, null, this.table7));
        this.db.logSave(new Log(this.userId, "logDeleteLastTable", "delete table", this.table7)); this.db.writeTitleTable(new TableTitle(this.userId, this.table7, "table8")); break;
      case 8: this.db.removeTable(new TableTitle(this.userId, null, this.table8));
        this.db.logSave(new Log(this.userId, "logDeleteLastTable", "delete table", this.table8)); this.db.writeTitleTable(new TableTitle(this.userId, this.table8, "table9")); break;
      case 9: this.db.removeTable(new TableTitle(this.userId, null, this.table9));
        this.db.logSave(new Log(this.userId, "logDeleteLastTable", "delete table", this.table9)); this.db.writeTitleTable(new TableTitle(this.userId, this.table9, "table10")); break;
    }
    this.db.writeUserNumber(new NumberSeeTable(this.userId, this.numbers[0].number))
  }
  public addTask(tableName: string): void {
    this.db.kanban = this.projectName;
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '250px',
      height: '500px',
      panelClass: 'no-padding-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.invalid) {
          window.alert("Please correct all errors and resubmit add task");
          this.db.logSave(new Log(this.userId, "logAddTaskFailed", "add task", "add task failed"));
        }
        else {
          this.endDate = result.value.task.endDate;
          if (this.endDate) this.endData = this.endDate.getDate() + '/' + (this.endDate.getMonth() + 1) + '/' + this.endDate.getFullYear();
          else this.endData = null; result.value.task.title
          if (this.checkIfTaskTitleIsNotFree(result.value.task.title, tableName)) window.alert("This task name is already taken. Please enter different one")
          else {
            this.db.kanban = this.projectName;
            this.db.writeUserTable(new Task(this.userId, tableName, this.replece(result.value.task.title), result.value.task.title, result.value.task.description, result.value.task.priority, result.value.task.color, result.value.task.endDate, ""));
          }
          this.db.logSave(new Log(this.userId, "logAddTask", "add task", "add task: " + result.value.task.title + " success"));
        }
      }
    });
  }
  public editTask(title: string, description: string, priority: string, color: string, endDate: string | Date, tableName: string, user: string): void {
    this.db.kanban = this.projectName;
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '350px',
      height: '550px',
      data: { title: title, description: description, priority: priority, color: color, endDate: endDate, checkView: this.checkIfView() },
      panelClass: 'no-padding-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.invalid.title) {
          window.alert("Please correct all errors and resubmit update task");
          this.db.logSave(new Log(this.userId, "logEditTaskFailed", "edit task", "edit task: " + title + "failed"));
        }
        else {
          this.endDate = result.value.task.endDate;
          this.endDataString = this.endDate + "";
          if (this.endDataString == "") this.endData = "";
          else {
            if (this.endDate == endDate) {
              if (this.endData == undefined) {
                this.endData = "";
              }
              else {
                this.endDataString = endDate.toString();
                this.tabEndDate = this.endDataString.split("/");
                this.endData = this.tabEndDate[0] + '/' + this.tabEndDate[1] + '/' + this.tabEndDate[2];
              }
            }
            else this.endData = this.endDate.getDate() + '/' + (this.endDate.getMonth() + 1) + '/' + this.endDate.getFullYear();
            if (this.endData == "/undefined/undefined") this.endData = "";
          }
          this.db.kanban = this.projectName;
          this.db.removeTask(new Task(this.userId, tableName, this.replece(title), null, null, null, null, null, null));
          this.db.writeUserTable(new Task(this.userId, tableName, this.replece(result.value.task.title), result.value.task.title, result.value.task.description, result.value.task.priority, result.value.task.color, this.endData, user));
          this.db.logSave(new Log(this.userId, "logEditTask", "edit task", "task " + title + " success"))
        }
      }
    });
  }
  public removeTask(removeTask: string, tableName: string): void {
    this.db.kanban = this.projectName;
    this.db.logSave(new Log(this.userId, "logRemoveTask", "remove task", "remove task: " + removeTask));
    this.db.removeTask(new Task(this.userId, tableName, removeTask, null, null, null, null, null, null));
  }
  public removeAllTask(tableName: string): void {
    this.db.logSave(new Log(this.userId, "logRemoveAllTask", "remove all task", "remove all task from table: " + tableName));
    this.db.removeTable(new TableTitle(this.userId, null, tableName));
  }
  public updateTableTitle(title: string, addTable: boolean): void {
    switch (title) {
      case "table0": this.tableEditTitle = this.tableTitle[0].title; break;
      case "table1": this.tableEditTitle = this.tableTitle[1].title; break;
      case "table2": this.tableEditTitle = this.tableTitle[2].title; break;
      case "table3": this.tableEditTitle = this.tableTitle[3].title; break;
      case "table4": this.tableEditTitle = this.tableTitle[4].title; break;
      case "table5": this.tableEditTitle = this.tableTitle[5].title; break;
      case "table6": this.tableEditTitle = this.tableTitle[6].title; break;
      case "table7": this.tableEditTitle = this.tableTitle[7].title; break;
      case "table8": this.tableEditTitle = this.tableTitle[8].title; break;
      case "table9": this.tableEditTitle = this.tableTitle[9].title; break;
    }
    const dialogRef = this.dialog.open(EditTableNameComponent, {
      width: '250px',
      height: '230px',
      data: { title: this.tableEditTitle, addTable: addTable },
      panelClass: 'no-padding-dialog'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        if (result.invalid) {
          this.db.logSave(new Log(this.userId, "logUpdateTableTitleFailed", "update table title ", "update table " + title + " failed"));
          window.alert("Please correct all errors and resubmit add task");
        }
        else {
          if (result) {
            this.db.kanban = this.projectName;
            if (addTable) {
              this.numbers[0].number++;
              this.db.writeUserNumber(new NumberSeeTable(this.userId, this.numbers[0].number));
            }
            this.titleTable = result.value.titleTable.title;
            this.db.logSave(new Log(this.userId, "logUpdateTableTitle", "update Table Title", "update table " + title + " success"));
            this.db.writeTitleTable(new TableTitle(this.userId, title, this.titleTable));

          }
        }
      }
    });
  }
  public replece(replace: string): string {
    this.word = "";
    for (let letter of replace) {
      letter = letter.replace(".", "@1@");
      letter = letter.replace("#", "@2@");
      letter = letter.replace("$", "@3@");
      letter = letter.replace("[", "@4@");
      letter = letter.replace("]", "@5@");
      this.word = this.word + letter;
    }
    return this.word;
  }

  public inreplece(replace: string): string {
    this.word = replace
    for (let letter of replace) {
      this.word = this.word.replace("@1@", ".");
      this.word = this.word.replace("@2@", "#");
      this.word = this.word.replace("@3@", "$");
      this.word = this.word.replace("@4@", "]");
      this.word = this.word.replace("@5@", "[");
    }
    return this.word;
  }
  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
    else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.saveChanges();
    }
  }
  private saveChanges(): void {
    this.db.kanban = this.projectName;
    this.db.logSave(new Log(this.userId, "logSaveChanges", "save changes", "save changes"));
    this.db.removeTable(new TableTitle(this.userId, null, this.table0));
    this.db.removeTable(new TableTitle(this.userId, null, this.table1));
    this.db.removeTable(new TableTitle(this.userId, null, this.table2));
    this.db.removeTable(new TableTitle(this.userId, null, this.table3));
    this.db.removeTable(new TableTitle(this.userId, null, this.table4));
    this.db.removeTable(new TableTitle(this.userId, null, this.table5));
    this.db.removeTable(new TableTitle(this.userId, null, this.table6));
    this.db.removeTable(new TableTitle(this.userId, null, this.table7));
    this.db.removeTable(new TableTitle(this.userId, null, this.table8));
    this.db.removeTable(new TableTitle(this.userId, null, this.table9));
    for (let task of this.tableZero) {
      if (task.endDate == null) task.endDate = "";
      this.db.writeUserTable(new Task(this.userId, this.table0, this.replece(task.title), task.title, task.description, task.priority, task.color, task.endDate, task.user));
    }
    for (let task of this.tableOne) {
      if (task.endDate == null) task.endDate = "";
      this.db.writeUserTable(new Task(this.userId, this.table1, this.replece(task.title), task.title, task.description, task.priority, task.color, task.endDate, task.user));
    }
    for (let task of this.tableTwo) {
      if (task.endDate == null) task.endDate = "";
      this.db.writeUserTable(new Task(this.userId, this.table2, this.replece(task.title), task.title, task.description, task.priority, task.color, task.endDate, task.user));
    }
    for (let task of this.tableThree) {
      if (task.endDate == null) task.endDate = "";
      this.db.writeUserTable(new Task(this.userId, this.table3, this.replece(task.title), task.title, task.description, task.priority, task.color, task.endDate, task.user));
    }
    for (let task of this.tableFour) {
      if (task.endDate == null) task.endDate = "";
      this.db.writeUserTable(new Task(this.userId, this.table4, this.replece(task.title), task.title, task.description, task.priority, task.color, task.endDate, task.user));
    }
    for (let task of this.tableFive) {
      if (task.endDate == null) task.endDate = "";
      this.db.writeUserTable(new Task(this.userId, this.table5, this.replece(task.title), task.title, task.description, task.priority, task.color, task.endDate, task.user));
    }
    for (let task of this.tableSix) {
      if (task.endDate == null) task.endDate = "";
      this.db.writeUserTable(new Task(this.userId, this.table6, this.replece(task.title), task.title, task.description, task.priority, task.color, task.endDate, task.user));
    }
    for (let task of this.tableSeven) {
      if (task.endDate == null) task.endDate = "";
      this.db.writeUserTable(new Task(this.userId, this.table7, this.replece(task.title), task.title, task.description, task.priority, task.color, task.endDate, task.user));
    }
    for (let task of this.tableEight) {
      if (task.endDate == null) task.endDate = "";
      this.db.writeUserTable(new Task(this.userId, this.table8, this.replece(task.title), task.title, task.description, task.priority, task.color, task.endDate, task.user));
    }
    for (let task of this.tableNine) {
      if (task.endDate == null) task.endDate = "";
      this.db.writeUserTable(new Task(this.userId, this.table9, this.replece(task.title), task.title, task.description, task.priority, task.color, task.endDate, task.user));
    }
  }
  public checkPrio(priority: string): string {
    switch (priority) {
      case "red": return "high"; break;
      case "yellow": return "medium"; break;
      case "green": return "low"; break;
      default: return "";
    }
  }

  public changeFont(): string {
    if (this.userInfo[0].thema == "gray") {
      return "white";
    }
    if (this.userInfo[0].thema == "black") {
      return "white";
    }
  }
  public changeBackground(): string {
    if (this.userInfo[0].thema == "gray") {
      return "gray";
    }
    if (this.userInfo[0].thema == "black") {
      return "black";
    }
  }
}
