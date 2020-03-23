import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatTableDataSource, MatDialog} from '@angular/material';
import { EditCategoryComponent } from 'src/app/modal/edit-category/edit-category.component';
import { AddCategoryComponent } from 'src/app/modal/add-category/add-category.component';
export interface Category {
  category: string;
  color: string;
}
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  userInfo=[];
  fontColor:string;
  background:string;
  info:string;
  infoEmail:string;
  userId:string;
  newCategory:string;
  color:string;
  category:Category[];
  displayedColumns: string[] = ['category', 'color','delete','edit'];
  dataLogs: MatTableDataSource<Category>;
  hide:boolean = true;
  verifyEmail=this.auth.getUser().emailVerified;
  checkPass:boolean=false;
  word:string;
  constructor(
    private auth:AuthService,
    private db:DataService,
    public dialog: MatDialog,
    private router: Router) { 
    this.userId=auth.getUser().uid;
  }
  ngOnInit():void {
    localStorage.setItem("menu","UserSettings");
    this.db.getDateUser(this.userId).subscribe(res => {
      this.userInfo = res;
    });
    this.db.getCategory(this.userId).subscribe(res => {
      this.category = res;
      this.dataLogs=new MatTableDataSource(this.category);
    });
  }
  sendRepeatVerificationEmail():void{
    this.auth.sendVerificationMail();
    this.db.logSave(this.userId,"reVerifacationEmail","Email","Send");
  }
  changeFont():string
  {
    if(this.userInfo[0].thema=="gray"){
      this.fontColor="white";
      return this.fontColor;
    }
    if(this.userInfo[0].thema=="black"){
      this.fontColor="white";
      return this.fontColor;
    }
  }
  changeBackground():string{
    if(this.userInfo[0].thema=="gray"){
      this.background="gray";
      return this.background;
    }
    if(this.userInfo[0].thema=="black"){
      this.background="black";
      return this.background;
    }
    if(this.userInfo[0].thema=="white"){
      this.background="white";
      return this.background;
    }
  }
  updateEmail(updateEmail):void{
    if(updateEmail.invalid) window.alert("Please try again");
    else{
      if(this.matchingEmail(updateEmail.value.oldEmail,this.userInfo[0].email)){
      if(this.matchingEmail(updateEmail.value.newEmail,updateEmail.value.oldEmail))
      {
         this.infoEmail="The old email is the same as the new email"
         this.db.logSave(this.userId,"logUpdateEmail","update Email","update Email failed: "+this.infoEmail)
      }
      else{
      if(this.matchingEmail(updateEmail.value.newEmail,updateEmail.value.newRepeatEmail))
      {
      this.auth.updateEmail(updateEmail.value.newEmail).then(()=>{
      this.auth.authState$.subscribe(user=>{
      this.db.updateEmail(this.userId,user.email)
      this.sendRepeatVerificationEmail();
      if(this.matchingEmail(updateEmail.value.newEmail,user.email))
      { 
      this.infoEmail="email successfuly updated";
      this.db.logSave(this.userId,"logUpdateEmail","update Email","update Email success: "+updateEmail.value.newEmail)
      }
      else
      {
        this.infoEmail="email dont updated";
        this.db.logSave(this.userId,"logUpdateEmail","update Email","update Email failed: "+this.infoEmail)
      }
    }); 
    })
      } else this.infoEmail='Email do not match.Try to again!';
    }
  } else 
  {
    this.infoEmail="Bad old email";
    this.db.logSave(this.userId,"logUpdateEmail","update Email","update Email failed: "+this.infoEmail)
  }
}
  }
  updatePassword(updatePassword):void{
    this.checkPass=false;
    if(updatePassword.invalid) window.alert("Passsword must contain at least 8 charactes,including UPPER/lowercase, and numbers")
    else
    { 
      this.auth.login(this.userInfo[0].email,updatePassword.value.oldPassword).then(() => {
      if(this.matchingPasswords(updatePassword.value.newPassword,updatePassword.value.oldPassword))
      {
       this.info="The old password is the same as the new password "
       this.db.logSave(this.userId,"logUpdatePassword","update password","update password failed"+this.info)
      }
      else{
      if(this.matchingPasswords(updatePassword.value.newPassword,updatePassword.value.newRepeatPassword)){
       this.checkPass=true;
       this.auth.updatePassowrd(updatePassword.value.newPassword);
       this.db.logSave(this.userId,"logUpdatePassword","update password","success")
       if(this.checkPass) this.info="password successfuly changed";
       else this.info="Operation failed";
      }
       } }).catch(err=>{
         if(err){
          this.info="Bad old password"
          this.db.logSave(this.userId,"logUpdatePassword","update password","update password failed:"+this.info)
         }
       })
    }
  }
  updateThema(updateThema):void
  {
    if(updateThema.invalid) window.alert("Please try again");
    else{
    this.db.updateThema(this.userId,updateThema.value.thema);
    this.db.logSave(this.userId,"logUpdateThema","update thema","update thema: "+updateThema.value.thema)
    }
  }
  matchingPasswords(repeatPassword:string,password: string):boolean{
    if(repeatPassword.valueOf()==password.valueOf()) return true;
    else {
      this.info='Passwords do not match.Try to again!';
      return false;
    }
  }
  matchingEmail(repeatEmail:string,email:string):boolean{
    if(repeatEmail.valueOf()==email.valueOf()) return true;
    else {
      return false;
    }
  }
  applyFilter(filterValue: string):void {
    this.dataLogs.filter = filterValue.trim().toLowerCase();
  }
  deleteAccount():void{
    localStorage.removeItem("lastTable");
    this.router.navigate(['/welcome-page'])
    .then(()=>this.db.remove(this.replece(this.userInfo[0].email)))
    .then(()=> this.db.deleteUser(this.userId))
    .then(()=> this.auth.deleteUser())
    
  }
  replece(replace:string):string{
    this.word="";
    for(let letter of replace)
    {
      letter=letter.replace(".","@1@");
      letter=letter.replace("#","@2@");      
      letter=letter.replace("$","@3@");
      letter=letter.replace("[","@4@");
      letter=letter.replace("]","@5@");
      this.word=this.word+letter;
    }
    return this.word;
  }
  deleteCategory(removeCategory):void{
    this.db.removeCategory(this.userId,removeCategory);
    this.db.logSave(this.userId,"logRemoveCategory","remove category","remove category: "+removeCategory)
  }
  editCategory(category:string,color:string):void {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
    width: '250px',
    data: {category: category,color:color}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined)
      {
        if(result.invalid){
          window.alert("Please correct all errors and resubmit update category");
          this.db.logSave(this.userId,"logEditCategoryFailed","edit category","edit category: "+category+" failed")
        }
        else{  
          this.newCategory=result.value.category.category;
          this.color=result.value.category.color;
            this.db.removeCategory(this.userId,category);
            this.db.writeCategory(this.userId,this.newCategory,this.color);
            this.db.logSave(this.userId,"logEditCategory","edit category","edit category: "+category+" success")
        }
      }
    }
    );
  }
  addCategory():void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
    width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined){
        if(result.invalid){
          window.alert("Please correct all errors and resubmit add category");
          this.db.logSave(this.userId,"logAddCategoryFailed","add category","add category failed")
        }
        else{
          this.newCategory=result.value.category.category;
          this.color=result.value.category.color;
          this.db.writeCategory(this.userId,this.newCategory,this.color)
          this.db.logSave(this.userId,"logAddCategory","add category","add catego"+this.newCategory+"success")
        }
      }
    });
  }
}
