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
  random:string;
  date:Date=new Date();
  newCategory:string;
  color:string;
  category:Category[];
  currentDate:string;
  displayedColumns: string[] = ['category', 'color','delete','edit'];
  dataLogs: MatTableDataSource<Category>;
  hide:boolean = true;
  verifyEmail=this.auth.getUser().emailVerified;
  checkPass:boolean=false;
  constructor(
    private auth:AuthService,
    private db:DataService,
    public dialog: MatDialog,
    private router: Router) { 
    this.userId=auth.getUser().uid;
  }
  ngOnInit():void {
    this.db.getDateUser(this.userId).subscribe(res => {
      this.userInfo = res;
    });
    this.db.getCategory(this.userId).subscribe(res => {
      this.category = res;
      this.dataLogs=new MatTableDataSource(this.category);
    });
  }
  zero(date){
    if(date<10) return 0;
    return "";
  }
  sendRepeatVerificationEmail():void{
    this.auth.sendVerificationMail();
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
  logout():void{
    this.random=Math.random().toString();
    this.random=this.random.replace("0.","logOut");
    this.currentDate=(this.date.getDate()+'/'+this.zero((this.date.getMonth()+1))+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.zero(this.date.getHours())+this.date.getHours()+':'+this.zero(this.date.getMinutes())+this.date.getMinutes()+':'+this.zero(this.date.getSeconds())+this.date.getSeconds());
    this.date=new Date;
    this.db.writeLogs(this.userId,this.random,this.currentDate,"log out","log out");
    this.auth.logout().then(() => this.router.navigate(['/welcome-page']));
  }
  return():void{
    this.router.navigate(['/dashboard']);
  }
  updateEmail(updateEmail):void{
    if(updateEmail.invalid) window.alert("Please try again");
    else{
      if(this.matchingEmail(updateEmail.value.oldEmail,this.userInfo[0].email)){
      if(this.matchingEmail(updateEmail.value.newEmail,updateEmail.value.oldEmail))
      {
         this.infoEmail="The old email is the same as the new email"
         this.random=Math.random().toString();
         this.random=this.random.replace("0.","logUpdateEmail");
         this.date=new Date;
         this.currentDate=(this.date.getDate()+'/'+this.zero((this.date.getMonth()+1))+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.zero(this.date.getHours())+this.date.getHours()+':'+this.zero(this.date.getMinutes())+this.date.getMinutes()+':'+this.zero(this.date.getSeconds())+this.date.getSeconds());
          
          this.db.writeLogs(this.userId,this.random,this.currentDate,"update Email","update Email failed: "+this.infoEmail);
      }
      else{
      if(this.matchingEmail(updateEmail.value.newEmail,updateEmail.value.newRepeatEmail))
      {
      this.auth.updateEmail(updateEmail.value.newEmail).then(()=>{
      this.auth.authState$.subscribe(user=>{
      this.db.updateEmail(this.userId,user.email)
      this.sendRepeatVerificationEmail();
      this.random=Math.random().toString();
      this.random=this.random.replace("0.","logUpdateEmail");
      this.date=new Date;
      this.currentDate=(this.date.getDate()+'/'+this.zero((this.date.getMonth()+1))+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.zero(this.date.getHours())+this.date.getHours()+':'+this.zero(this.date.getMinutes())+this.date.getMinutes()+':'+this.zero(this.date.getSeconds())+this.date.getSeconds());
      if(this.matchingEmail(updateEmail.value.newEmail,user.email))
      { 
      this.infoEmail="email successfuly updated";
      this.date=new Date;
      this.currentDate=(this.date.getDate()+'/'+this.zero((this.date.getMonth()+1))+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.zero(this.date.getHours())+this.date.getHours()+':'+this.zero(this.date.getMinutes())+this.date.getMinutes()+':'+this.zero(this.date.getSeconds())+this.date.getSeconds());
      this.db.writeLogs(this.userId,this.random,this.currentDate,"update Email","update Email success: "+updateEmail.value.newEmail);
      }
      else
      {
        this.infoEmail="email dont updated";
        this.date=new Date;
        this.currentDate=(this.date.getDate()+'/'+this.zero((this.date.getMonth()+1))+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.zero(this.date.getHours())+this.date.getHours()+':'+this.zero(this.date.getMinutes())+this.date.getMinutes()+':'+this.zero(this.date.getSeconds())+this.date.getSeconds());
        this.db.writeLogs(this.userId,this.random,this.currentDate,"update Email","update Email failed: "+this.infoEmail);
      }
    }); 
    })
      } else this.infoEmail='Email do not match.Try to again!';
    }
  } else 
  {
    this.random=Math.random().toString();
    this.random=this.random.replace("0.","logUpdateEmail");
    this.date=new Date;
    this.currentDate=(this.date.getDate()+'/'+this.zero((this.date.getMonth()+1))+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.zero(this.date.getHours())+this.date.getHours()+':'+this.zero(this.date.getMinutes())+this.date.getMinutes()+':'+this.zero(this.date.getSeconds())+this.date.getSeconds());
    this.infoEmail="Bad old email";
    this.db.writeLogs(this.userId,this.random,this.currentDate,"update Email","update Email failed: "+this.infoEmail);
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
         this.random=Math.random().toString();
       this.random=this.random.replace("0.","logUpdatePassword");
       this.date=new Date;
       this.currentDate=(this.date.getDate()+'/'+this.zero((this.date.getMonth()+1))+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.zero(this.date.getHours())+this.date.getHours()+':'+this.zero(this.date.getMinutes())+this.date.getMinutes()+':'+this.zero(this.date.getSeconds())+this.date.getSeconds());
       this.db.writeLogs(this.userId,this.random,this.currentDate,"update password","update password failed"+this.info);
      }
      else{
      if(this.matchingPasswords(updatePassword.value.newPassword,updatePassword.value.newRepeatPassword)){
       this.checkPass=true;
       this.auth.updatePassowrd(updatePassword.value.newPassword);
       this.random=Math.random().toString();
       this.random=this.random.replace("0.","logUpdatePassword");
       this.date=new Date;
       this.currentDate=(this.date.getDate()+'/'+this.zero((this.date.getMonth()+1))+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.zero(this.date.getHours())+this.date.getHours()+':'+this.zero(this.date.getMinutes())+this.date.getMinutes()+':'+this.zero(this.date.getSeconds())+this.date.getSeconds());
       this.db.writeLogs(this.userId,this.random,this.currentDate,"update password","success");
       if(this.checkPass) this.info="password successfuly changed";
       else this.info="Operation failed";
      }
       } }).catch(err=>{
         if(err){
          this.info="Bad old password"
          this.random=Math.random().toString();
       this.random=this.random.replace("0.","logUpdatePassword");
       this.date=new Date;
       this.currentDate=(this.date.getDate()+'/'+this.zero((this.date.getMonth()+1))+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.zero(this.date.getHours())+this.date.getHours()+':'+this.zero(this.date.getMinutes())+this.date.getMinutes()+':'+this.zero(this.date.getSeconds())+this.date.getSeconds());
       this.db.writeLogs(this.userId,this.random,this.currentDate,"update password","update password failed:"+this.info);
         }
       })
    }
  }
  updateThema(updateThema):void
  {
    if(updateThema.invalid) window.alert("Please try again");
    else{
    this.db.updateThema(this.userId,updateThema.value.thema);
    this.random=Math.random().toString();
    this.random=this.random.replace("0.","logUpdateThema");
    this.date=new Date;
    this.currentDate=(this.date.getDate()+'/'+this.zero((this.date.getMonth()+1))+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.zero(this.date.getHours())+this.date.getHours()+':'+this.zero(this.date.getMinutes())+this.date.getMinutes()+':'+this.zero(this.date.getSeconds())+this.date.getSeconds());
    this.db.writeLogs(this.userId,this.random,this.currentDate,"update thema","update thema: "+updateThema.value.thema);
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
    this.router.navigate(['/welcome-page'])
    .then(()=> this.db.deleteUser(this.userId))
    .then(()=> this.auth.deleteUser());
  }
  deleteCategory(removeCategory):void{
    this.db.removeCategory(this.userId,removeCategory);
    this.random=Math.random().toString();
    this.random=this.random.replace("0.","logRemoveCategory");
    this.date=new Date;
    this.currentDate=(this.date.getDate()+'/'+this.zero((this.date.getMonth()+1))+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.zero(this.date.getHours())+this.date.getHours()+':'+this.zero(this.date.getMinutes())+this.date.getMinutes()+':'+this.zero(this.date.getSeconds())+this.date.getSeconds());
    this.db.writeLogs(this.userId,this.random,this.currentDate,"remove category","remove category: "+removeCategory);
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
          this.random=Math.random().toString();
          this.random=this.random.replace("0.","logEditCategoryFailed");
          this.date=new Date;
          this.currentDate=(this.date.getDate()+'/'+this.zero((this.date.getMonth()+1))+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.zero(this.date.getHours())+this.date.getHours()+':'+this.zero(this.date.getMinutes())+this.date.getMinutes()+':'+this.zero(this.date.getSeconds())+this.date.getSeconds());
          this.db.writeLogs(this.userId,this.random,this.currentDate,"edit category","edit category: "+category+" failed");
        }
        else{  
          this.newCategory=result.value.category.category;
          this.color=result.value.category.color;
            this.db.removeCategory(this.userId,category);
            this.db.writeCategory(this.userId,this.newCategory,this.color);
            this.random=Math.random().toString();
            this.random=this.random.replace("0.","logEditCategory");
            this.date=new Date;
            this.currentDate=(this.date.getDate()+'/'+this.zero((this.date.getMonth()+1))+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.zero(this.date.getHours())+this.date.getHours()+':'+this.zero(this.date.getMinutes())+this.date.getMinutes()+':'+this.zero(this.date.getSeconds())+this.date.getSeconds());
            this.db.writeLogs(this.userId,this.random,this.currentDate,"edit category","edit category: "+category+" success");
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
          this.random=Math.random().toString();
          this.random=this.random.replace("0.","logAddCategoryFailed");
          this.date=new Date;
          this.currentDate=(this.date.getDate()+'/'+this.zero((this.date.getMonth()+1))+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.zero(this.date.getHours())+this.date.getHours()+':'+this.zero(this.date.getMinutes())+this.date.getMinutes()+':'+this.zero(this.date.getSeconds())+this.date.getSeconds());
          this.db.writeLogs(this.userId,this.random,this.currentDate,"add category","add category failed");
        }
        else{
          this.newCategory=result.value.category.category;
          this.color=result.value.category.color;
          this.db.writeCategory(this.userId,this.newCategory,this.color)
          this.random=Math.random().toString();
          this.random=this.random.replace("0.","logAddCategory");
          this.date=new Date;
          this.currentDate=(this.date.getDate()+'/'+this.zero((this.date.getMonth()+1))+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.zero(this.date.getHours())+this.date.getHours()+':'+this.zero(this.date.getMinutes())+this.date.getMinutes()+':'+this.zero(this.date.getSeconds())+this.date.getSeconds());
          this.db.writeLogs(this.userId,this.random,this.currentDate,"add category","add catego"+this.newCategory+"success");
        }
      }
    });
  }
}
