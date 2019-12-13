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
  pokaz:boolean=false;
  fontColor:string;
  background:string;
  info:string;
  userId:string;
  random:string;
  date:Date=new Date();
  newCategory:string;
  color:string;
  category:Category[];
  currentDate:string;
  displayedColumns: string[] = ['category', 'color','delete','edit'];
  dataLogs: MatTableDataSource<Category>;
  constructor(
    private auth:AuthService,
    private db:DataService,
    public dialog: MatDialog,
    private router: Router) { 
    this.userId=auth.getUser().uid;
  }
  ngOnInit() {
    this.db.getDateUser(this.userId).subscribe(res => {
      this.userInfo = res;
    });
    this.db.getCategory(this.userId).subscribe(res => {
      this.category = res;
      this.dataLogs=new MatTableDataSource(this.category);
    });
  }

  changeFont():string
  {
    if(this.userInfo[0].thema=="green"){
      this.fontColor="white";
      return this.fontColor;
    }
    if(this.userInfo[0].thema=="black"){
      this.fontColor="white";
      return this.fontColor;
    }
  }
  changeBackground(){
    if(this.userInfo[0].thema=="green"){
      this.background="green";
      return this.background;
    }
    if(this.userInfo[0].thema=="black"){
      this.background="black";
      return this.background;
    }
  }
  logout():void{
    this.random=Math.random().toString();
    this.random=this.random.replace("0.","logOut");
    this.currentDate=(this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds());
    this.db.writeLogs(this.userId,this.random,this.currentDate,"log out","log out","","","","");
    this.auth.logout().then(() => this.router.navigate(['/welcome-page']));
  }
  return():void{
    this.router.navigate(['/dashboard']);
  }
  updateEmail(updateEmail){
    if(updateEmail.invalid) window.alert("Please try again");
    else{
      this.auth.updateEmail(updateEmail.value.newEmail);
      this.db.updateEmail(this.userId,updateEmail.value.newEmail);
    }
  }
  updatePassword(updatePassword){
    if(updatePassword.invalid) window.alert("Passsword must contain at least 8 charactes,including UPPER/lowercase, and numbers")
    else
    { 
      if(this.matchingPasswords(updatePassword.value.newPassword,updatePassword.value.newRepeatPassword)) this.auth.updatePassowrd(updatePassword.value.newPassword);
    }
  }
  updateThema(updateThema)
  {
    if(updateThema.invalid) window.alert("Please try again");
    else this.db.updateThema(this.userId,updateThema.value.thema);
  }
  matchingPasswords(repeatPassword,password):boolean{
    if(repeatPassword.valueOf()==password.valueOf()) return true;
    else {
      this.info='Passwords do not match.Try to again!';
      return false;
    }
  }
  applyFilter(filterValue: string) {
    this.dataLogs.filter = filterValue.trim().toLowerCase();
  }
  deleteAccount(){
    this.db.deleteUser(this.userId);
    this.auth.deleteUser()
    .then(()=>this.router.navigate(['/welcome-page']));
  }
  deleteCategory(removeCategory){
    this.db.removeCategory(this.userId,removeCategory);
  }
  editCategory(category,color):void {
    const dialogRef = this.dialog.open(EditCategoryComponent, {
    width: '250px',
    data: {category: category,color:color}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined)
      {
        if(result.invalid){
          window.alert("Please correct all errors and resubmit update task");
          this.random=Math.random().toString();
          this.random=this.random.replace("0.","logEditCategoryFailed");
          this.currentDate=(this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds());
          this.db.writeLogs(this.userId,this.random,this.currentDate,"edit task failed",category,"","",color,"");
        }
        else{  
          this.newCategory=result.value.category.category;
          this.color=result.value.category.color;
            this.db.removeCategory(this.userId,category);
            this.db.writeCategory(this.userId,this.newCategory,this.color);
            this.random=Math.random().toString();
            this.random=this.random.replace("0.","logEditCategory");
            this.currentDate=(this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds());
            this.db.writeLogs(this.userId,this.random,this.currentDate,"edit task",this.newCategory,"","",this.color,"");
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
            this.currentDate=(this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds());
            this.db.writeLogs(this.userId,this.random,this.currentDate,"add category failed","","","","","");
          }
          else{
            this.newCategory=result.value.category.category;
            this.color=result.value.category.color;
            this.db.writeCategory(this.userId,this.newCategory,this.color)
              this.random=Math.random().toString();
              this.random=this.random.replace("0.","logAddCategory");
              this.currentDate=(this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds());
              this.db.writeLogs(this.userId,this.random,this.currentDate,"add category",this.newCategory,"","",this.color,"");
          }
        }
      }
      );
    }

  bestRegards():void{
    this.pokaz=!this.pokaz;
  } 
}
