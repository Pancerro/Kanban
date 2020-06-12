import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/database/database.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { EditCategoryComponent } from 'src/app/modal/edit-category/edit-category.component';
import { AddCategoryComponent } from 'src/app/modal/add-category/add-category.component';
import { Log } from 'src/app/class/log/log';
import { Category } from 'src/app/class/category/category';
import { UserDate } from 'src/app/class/userDate/user-date';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { Show } from 'src/app/class/show/show';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  private subscription:Subscription = new Subscription();
  public see: Show[] = [new Show("Edit", false), new Show("Edit", false), new Show("Edit", false), new Show("Edit", false), new Show("Edit", false)];
  public userInfo: UserDate[] = [];
  public fontColor: string;
  public background: string;
  public displayedColumns: string[] = ['category', 'color', 'delete', 'edit'];
  public dataCategory: MatTableDataSource<Category>;
  public verifyEmail: boolean;
  public hide: boolean = true;
  private userId: string;
  private category: Category[];
  private checkPass: boolean = false;
  constructor(
    private auth: AuthService,
    private titleService: Title,
    private db: DataService,
    private router: Router,
    public dialog: MatDialog) {
    this.userId = auth.getUser().uid;
    this.verifyEmail = auth.getUser().emailVerified;
  }
  public ngOnInit(): void {
    localStorage.setItem("menu", "User Settings");
    this.titleService.setTitle("User Settings");
    this.subscription.add( this.db.getDateUser(this.userId).subscribe((userDate: UserDate[]) => {
      this.userInfo = userDate;
      this.fontColor = this.db.changeFont(userDate[0].thema);
      this.background = this.db.changeBackground(userDate[0].thema);
    }));
    this.subscription.add(this.db.getCategory(this.userId).subscribe((category: Category[]) => {
      this.dataCategory = new MatTableDataSource(category);
      this.category = category;
    }));
  }
  public seeSettings(option: number):void {
      if (this.see[option].see) this.see[option] = new Show("Edit", false);
      else this.see[option] = new Show("Close", true);
  }
  public sendRepeatVerificationEmail(): void {
    this.auth.sendVerificationMail().then(() => {
      this.db.logSave(new Log(this.userId, "reVerifacationEmail", "Email", "Send"));
    });
  }
  public updateEmail(updateEmail: { invalid: any; oldEmail: string; newEmail: string; newRepeatEmail: string; }): void {
    if (updateEmail.invalid) window.alert("Please try again");
    else {
      if (this.matchingEmail(updateEmail.oldEmail, this.userInfo[0].email)) {
        if (this.matchingEmail(updateEmail.newEmail, updateEmail.oldEmail)) {
          document.getElementById("emailInfo").innerHTML = "The old email is the same as the new email";
          this.db.logSave(new Log(this.userId, "logUpdateEmail", "update Email", "update Email Failed: The old email is the same as the new email"));
        }
        else {
          if (this.matchingEmail(updateEmail.newEmail, updateEmail.newRepeatEmail)) {
            this.auth.updateEmail(updateEmail.newEmail).then(() => {
              this.auth.authState$.subscribe(user => {
                this.db.updateEmail(new UserDate(this.userId, user.email, null, null));
                this.sendRepeatVerificationEmail();
                if (this.matchingEmail(updateEmail.newEmail, user.email)) {
                  document.getElementById("emailInfo").innerHTML = "email successfuly updated";
                  this.db.logSave(new Log(this.userId, "logUpdateEmail", "update Email", "update Email success: " + updateEmail.newEmail));
                }
                else {
                  document.getElementById("emailInfo").innerHTML= "email dont updated";
                  this.db.logSave(new Log(this.userId, "LogUpdateEmail", "update Email", "update Email failed: email dont updated"));
                }
              });
            })
          } else {
           document.getElementById("emailInfo").innerHTML= 'Email do not match.Try to again!';
           this.db.logSave(new Log(this.userId, "LogUpdateEmail", "update Email", "update Email failed: Email do not match " ));
          }
        }
      } else {
        document.getElementById("emailInfo").innerHTML= "Bad old email";
        this.db.logSave(new Log(this.userId, "logUpdateEmail", "update Email", "update Email failed: Bad old email" ));
      }
    }
  }
   private matchingEmail(repeatEmail: string, email: string): boolean {
    if (repeatEmail.valueOf() == email.valueOf()) return true;
    else return false;
  }
  public updatePassword(updatePassword: { invalid: any; oldPassword: string; newPassword: string; newRepeatPassword: string; }): void {
    this.checkPass = false;
    if (updatePassword.invalid) window.alert("Passsword must contain at least 8 charactes,including UPPER/lowercase, and numbers");
    else {
      this.auth.login(this.userInfo[0].email, updatePassword.oldPassword).then(() => {
        if (this.matchingPasswords(updatePassword.newPassword, updatePassword.oldPassword)) {
          document.getElementById("passInfo").innerHTML = "The old password is the same as the new password ";
          this.db.logSave(new Log(this.userId, "logUpdatePassword", "update password", "update password failed: The old password is the same as the new password "));
        }
        else {
          if (this.matchingPasswords(updatePassword.newPassword, updatePassword.newRepeatPassword)) {
            this.checkPass = true;
            this.auth.updatePassowrd(updatePassword.newPassword);
            this.db.logSave(new Log(this.userId, "logUpdatePassword", "update password", "success"));
            if (this.checkPass)  document.getElementById("passInfo").innerHTML = "password successfuly changed";
            else  document.getElementById("passInfo").innerHTML= "Operation failed";
          }
        }
      }).catch(err => {
        if (err) {
          document.getElementById("passInfo").innerHTML = "Bad old password";
          this.db.logSave(new Log(this.userId, "logUpdatePassword", "update password", "update password failed: Bad old password"));
        }
      })
    }
  }
  private matchingPasswords(repeatPassword: string, password: string): boolean {
    if (repeatPassword.valueOf() == password.valueOf()) return true;
    else {
      document.getElementById("passInfo").innerHTML= 'Passwords do not match.Try to again!';
      return false;
    }
  }
  public resetPassword():void{
    this.auth.resetPassword(this.userInfo[0].email)
    .catch(() => {window.alert("eh! error, please try to again")});
  }
 
  public updateThema(updateThema: { invalid: any; thema: string; }): void {
    if (updateThema.invalid) window.alert("Please try again");
    else {
      this.db.updateThema(new UserDate(this.userId, null, updateThema.thema, null));
      this.db.logSave(new Log(this.userId, "logUpdateThema", "update thema", "update thema: " + updateThema.thema));
    }
  }
  public applyFilter(filterValue: string): void {
    this.dataCategory.filter = filterValue.trim().toLowerCase();
  }

  public deleteCategory(removeCategory: string): void {
    this.db.removeCategory(new Category(this.userId, removeCategory, null));
    this.db.logSave(new Log(this.userId, "logRemoveCategory", "remove category", "remove category: " + removeCategory));
  }
  public editCategory(category: string, color: string): void {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
      width: '250px',
      height: '300px',
      data: { category: category, color: color },
      panelClass: 'no-padding-dialog'

    });
    dialogRef.afterClosed().subscribe(editCategory => {
      if (editCategory != undefined) {
        if (editCategory.invalid) {
          window.alert("Please correct all errors and resubmit update category");
          this.db.logSave(new Log(this.userId, "logEditCategoryFailed", "edit category", "edit category: " + category + " failed"));
        }
        else {
          this.db.removeCategory(new Category(this.userId, category, null));
          this.db.writeCategory(new Category(this.userId, editCategory.category, editCategory.color));
          this.db.logSave(new Log(this.userId, "logEditCategory", "edit category", "edit category: " + category + " success"));
        }
      }
    }
    );
  }
  public addCategory(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '250px',
      height:'300px',
      panelClass: 'no-padding-dialog'
    });
    dialogRef.afterClosed().subscribe(newCategory => {
      if (newCategory != undefined) {
        if (newCategory.invalid) {
          window.alert("Please correct all errors and resubmit add category");
          this.db.logSave(new Log(this.userId, "logAddCategoryFailed", "add category", "add category failed"));
        }
        else {
          if (this.checkIfHaveCategory(newCategory.category)) {
            window.alert("The category is already there");
            this.db.logSave(new Log(this.userId, "logAddCategory", "add category", "add category " + newCategory.category + " failed"));
          }
          else {
            this.db.writeCategory(new Category(this.userId, newCategory.category, newCategory.color));
            this.db.logSave(new Log(this.userId, "logAddCategory", "add category", "add category " + newCategory.category + " success"));
          }
        }
      }
    });
  }
  private checkIfHaveCategory(nameCategory: string): boolean {
    for (let oldCategory of this.category) {
      if (oldCategory.category == nameCategory) {
        return true;
      }
    }
    return false;
  }
  public deleteAccount(): void {
    localStorage.removeItem("lastTable");
    this.router.navigate(['/welcome-page'])
      .then(() => this.db.remove(this.db.replece(this.userInfo[0].email)))
      .then(() => this.db.deleteUser(this.userId))
      .then(() => this.auth.deleteUser());
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
