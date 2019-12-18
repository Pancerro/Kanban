import { Component} from '@angular/core';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from 'src/app/modal/register/register.component';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from 'src/app/modal/login/login.component';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/database.service';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css'],
  animations: [
    trigger(
      'inOutAnimation', 
      [
        transition(
          ':enter', 
          [
            style({
             filter:' grayscale(0%) brightness(100%)'}),
            animate('4s ease-out',  style({
              background: "no-repeat url('data:image/jpeg;base64,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')"
             , height: 500, width:8000, opacity: 1 ,filter:' grayscale(0%) brightness(100%)'})),
             animate('4s ease-out',  style({
              background: "no-repeat url('data:image/jpeg;base64,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')"
                  ,opacity: 0 ,filter:' grayscale(100%) brightness(100%)'})),
                  animate('4s ease-out',  style({
                    background: "no-repeat url(https://i.imgur.com/9ZQatoL.png)",
                    width: 500,
                    height: 500,  opacity: 1 ,filter:' grayscale(0%) brightness(100%)'})),
          ]
           
        )
  
      ]
    )
  ]
})
export class WelcomePageComponent   {
  constructor(public dialog: MatDialog,
    private router: Router,
    public auth:AuthService,
    public db:DataService) {}
  random:string;
  captcha:boolean=false;
  numberOfTests:number=0;
  userId:string;
  info:string;
  email:string;
  thema:string;
  date:Date= new Date();
  currentDate:string;
  registerUser(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
    width: '350px',   
  });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined){
        this.random=Math.random().toString();
        this.random=this.random.replace("0.","logRegister");
        this.currentDate=(this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds());
        if(result.invalid){
          this.info="Please correct all errors and resubmit the form register";
        }
        else{
          if(this.matchingPasswords(result.value.register.repeatPassword,result.value.register.password)==true){
            this.email=result.value.register.email;
            this.thema=result.value.register.thema;
            this.thema=""; // :)
            this.auth.register(result.value.register.email,result.value.register.password)
            .then(()=>{this.info="You can login now ";
            this.userId=this.auth.getUser().uid
            this.db.writeTitleTable(this.userId,"table0","table0")
            this.db.writeTitleTable(this.userId,"table1","table1")
            this.db.writeTitleTable(this.userId,"table2","table2")
            this.db.writeTitleTable(this.userId,"table3","table3")
            this.db.writeTitleTable(this.userId,"table4","table4")
            this.db.writeTitleTable(this.userId,"table5","table5")
            this.db.writeTitleTable(this.userId,"table6","table6")
            this.db.writeTitleTable(this.userId,"table7","table7")
            this.db.writeTitleTable(this.userId,"table8","table8")
            this.db.writeTitleTable(this.userId,"table9","table9")
            this.db.writeUserNumber(this.userId,3)
            this.db.writeLogs(this.userId,this.random,this.currentDate,"Create Account","","","","","")
            this.db.writeCategory(this.userId,"not easy","blue")
            this.db.writeCategory(this.userId,"easy","green")
            this.db.writeCategory(this.userId,"critical","red")
            this.db.writeCategory(this.userId,"normal","white")
            this.db.writeUserData(this.userId,this.email,this.thema);
    })}}}});
  }
  loginUser(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=undefined){
        this.random=Math.random().toString();
        this.random=this.random.replace("0.","logIn");
        this.currentDate=(this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds());
      if(result==false) this.numberOfTests++;
      else{
        this.auth.login(result.email,result.password).then(() => this.router.navigate(['/dashboard'])).catch(err => this.loginError())
        .then(()=>this.db.writeLogs(this.userId,this.random,this.currentDate,"Log in","","","","",""));
      }
    }else this.numberOfTests++;
  });
}
  loginError():void{
    this.numberOfTests++;
    this.info="Login Failed.Try Again";
  }
  viewCaptcha():boolean{
    if(this.numberOfTests>=3) return true;
    else return false;
  }
  resolved(captchaResponse):void {
    this.captcha=captchaResponse;
    this.numberOfTests=0;
} 
  matchingPasswords(repeatPassword,password):boolean{
    if(repeatPassword.valueOf()==password.valueOf()) return true;
    else {
      this.info='Passwords do not match.Try to register again!';
      return false;
  }
}
  loginWithGoogle():void{
  this.auth.googleAuth().then(()=>{
    this.userId=this.auth.getUser().uid;
    this.email=this.auth.getUser().email
    this.random=Math.random().toString();
    this.random=this.random.replace("0.","logLoginWitchGoogle");
    this.currentDate=(this.date.getDate()+'/'+(this.date.getMonth()+1)+'/'+this.date.getFullYear()+" "+this.date.getHours()+':'+this.date.getMinutes()+':'+this.date.getSeconds());
    this.db.writeLogs(this.userId,this.random,this.currentDate,"LOGIN WITH GOOGLE","","","","","");
    this.db.writeUserData(this.userId,this.email,"");
    this.db.getCategory(this.userId).subscribe(res => {
      if(res.length==0)
      {
        this.db.writeCategory(this.userId,"not easy","blue");
        this.db.writeCategory(this.userId,"easy","green");
        this.db.writeCategory(this.userId,"critical","red");
        this.db.writeCategory(this.userId,"normal","white");
      }
    })
  this.db.getTask(this.userId,"table").subscribe(res => {
    if(res.length==0) 
    {
      this.db.writeTitleTable(this.userId,"table0","table0");
      this.db.writeTitleTable(this.userId,"table1","table1");
      this.db.writeTitleTable(this.userId,"table2","table2");
      this.db.writeTitleTable(this.userId,"table3","table3");
      this.db.writeTitleTable(this.userId,"table4","table4");
      this.db.writeTitleTable(this.userId,"table5","table5");
      this.db.writeTitleTable(this.userId,"table6","table6");
      this.db.writeTitleTable(this.userId,"table7","table7");
      this.db.writeTitleTable(this.userId,"table8","table8");
      this.db.writeTitleTable(this.userId,"table9","table9");
    }
  });
  this.db.getUserNumber(this.userId).subscribe(res => {
    if(res.length==0) this.db.writeUserNumber(this.userId,3);
  });
  this.router.navigate(['/dashboard'])
})
}
}
