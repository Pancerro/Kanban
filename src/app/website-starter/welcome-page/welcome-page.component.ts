import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from 'src/app/modal/register/register.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoginComponent } from 'src/app/modal/login/login.component';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/database/database.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Log } from 'src/app/class/log/log';
import { MyFriend } from 'src/app/class/myFriend/my-friend';
import { AllUser } from 'src/app/class/allUser/all-user';
import { UserDate } from 'src/app/class/userDate/user-date';
import { TableTitle } from 'src/app/class/tableTitle/table-title';
import { Category } from 'src/app/class/category/category';
import { NumberSeeTable } from 'src/app/class/numberSeeTable/number-see-table';
import { Project } from 'src/app/class/project/project';
import { Task } from 'src/app/class/task/task';
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
})

export class WelcomePageComponent {
  constructor(public dialog: MatDialog,
    public router: Router,
    public auth: AuthService,
    public db: DataService) { }
  private captcha: boolean = false;
  private numberOfTests: number = 0;
  public info: string;
  public registerUser(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe(register => {
      if (register != undefined) {
        if (register.invalid) {
          this.info = "Please correct all errors and resubmit the form register";
        }
        else {
          if (this.matchingPasswords(register.repeatPassword, register.password) == true) {
            this.auth.register(register.email, register.password)
              .then(() => {
                this.info = "You can login now ";
                this.writeInfoUser(this.auth.getUser().uid, register.email, register.thema);
              })
          }
        }
      }
    });
  }
  public loginUser(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(login => {
      if (login != undefined) {
        if (login == false) this.numberOfTests++;
        else {
          this.auth.login(login.email, login.password).then(() => this.router.navigate(['/dashboard'])).catch(err => this.loginError())
            .then(() => {
              this.db.logSave(new Log(this.auth.getUser().uid, "logIn", "log in", "log in"))
              this.db.updateOnline(new AllUser(this.auth.getUser().uid, this.db.replece(login.email), true));
            })

        }
      } else this.numberOfTests++;
    });
  }
  private loginError(): void {
    this.numberOfTests++;
    this.info = "Login Failed.Try Again";
  }
  public viewCaptcha(): boolean {
    if (this.numberOfTests >= 3) return true;
    else return false;
  }
  public resolved(captchaResponse: boolean): void {
    this.captcha = captchaResponse;
    this.numberOfTests = 0;
  }
  private matchingPasswords(repeatPassword: string, password: string): boolean {
    if (repeatPassword.valueOf() == password.valueOf()) return true;
    else {
      this.info = 'Passwords do not match.Try to register again!';
      return false;
    }
  }

  public loginWithGoogle(): void {
    this.auth.googleAuth().then(() => {
      this.auth.getUser().email;
      this.db.updateOnline(new AllUser(this.auth.getUser().uid, this.db.replece(this.auth.getUser().email), true));
      this.db.logSave(new Log(this.auth.getUser().uid, "logLoginWitchGoogle", "lothis.emailg in", "with google"))
      this.db.getTask(new Task(this.auth.getUser().uid, "table", null, null, null, null, null, null, null)).subscribe(res => {
        if (res.length == 0) {
          this.writeInfoUser(this.auth.getUser().uid, this.auth.getUser().email, "");
          this.db.updateOnline(new AllUser(this.auth.getUser().uid, this.db.replece(this.auth.getUser().email), true));
        }
      });
      this.db.updateOnline(new AllUser(this.auth.getUser().uid, this.db.replece(this.auth.getUser().email), true));
      this.router.navigate(['/dashboard'])
    })

  }
  private writeInfoUser(userId: string, email: string, thema: string): void {
    this.db.writeMyFriends(new MyFriend(userId, this.db.replece(email), userId, true));
    localStorage.setItem("lastTable", "kanban");
    this.db.kanban = localStorage.getItem("lastTable")
    this.db.writeUser(new AllUser(userId, this.db.replece(email), false));
    this.db.writeTitleTable(new TableTitle(userId, "table0", "to do"))
    this.db.writeTitleTable(new TableTitle(userId, "table1", "doing"))
    this.db.writeTitleTable(new TableTitle(userId, "table2", "done"))
    this.db.writeTitleTable(new TableTitle(userId, "table3", "table4"))
    this.db.writeTitleTable(new TableTitle(userId, "table4", "table5"))
    this.db.writeTitleTable(new TableTitle(userId, "table5", "table6"))
    this.db.writeTitleTable(new TableTitle(userId, "table6", "table7"))
    this.db.writeTitleTable(new TableTitle(userId, "table7", "table8"))
    this.db.writeTitleTable(new TableTitle(userId, "table8", "table9"))
    this.db.writeTitleTable(new TableTitle(userId, "table9", "table10"))
    this.db.writeUserNumber(new NumberSeeTable(userId, 3))
    this.db.logSave(new Log(userId, "logRegister", "create Account", "create Account"))
    this.db.writeCategory(new Category(userId, "date", "pink"));
    this.db.writeCategory(new Category(userId, "shop", "green"));
    this.db.writeCategory(new Category(userId, "cars", "red"));
    this.db.writeCategory(new Category(userId, "school", "white"));
    this.db.writeUserData(new UserDate(userId, email, thema, false));
    this.db.writeKanbanTable(new Project(userId, this.db.kanban, false))

  }

}
