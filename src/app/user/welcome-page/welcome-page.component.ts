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
            animate('4s ease-out',  style({ //->
              transform: 'rotateY(180deg) rotateZ(90deg) ',
              background: " no-repeat url(https://images.squarespace-cdn.com/content/v1/528252b7e4b00150d03a4848/1503802786036-ZOOD48EI07ZEY2B3N3I9/ke17ZwdGBToddI8pDm48kJUlZr2Ql5GtSKWrQpjur5t7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Uc2TsYyWrvo4cxLsTiAHD0wm8wv6KuSQ-vWcvdKCNFvRm4bjm9DAHF2kOsIZRJKXnA/RickAndMorty_RickAngryBurp1500.gif?format=500w)"
          })),
            animate('4s ease-out',  style({
              transform: 'translateX(50%) translateY(20%)',//|
              background: " no-repeat url(https://images.squarespace-cdn.com/content/v1/528252b7e4b00150d03a4848/1503802775944-14J565KYKE9VUEXQZ7UX/ke17ZwdGBToddI8pDm48kJUlZr2Ql5GtSKWrQpjur5t7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Uc2TsYyWrvo4cxLsTiAHD0wm8wv6KuSQ-vWcvdKCNFvRm4bjm9DAHF2kOsIZRJKXnA/RickAndMorty_MortyConfusedBlink1500.gif?format=500w)"
          })),
            animate('4s ease-out',  style({
              transform: 'translateX(-50%) translateY(20%)',//<-
              background: " no-repeat url(https://chpic.su/_data/stickers/d/DamnRicknMorty/DamnRicknMorty_030.webp)"
          })),
            animate('4s ease-out',  style({
              transform: 'translateX(-50%) translateY(0%)',
              background: " no-repeat url(https://thumbs.gfycat.com/BarrenTightLeopard-size_restricted.gif)"})), //|
              
            animate('4s ease-out',  style({
              transform: 'rotateY(270deg) rotateZ(270deg) translateX(0%) translateY(0%)',
              background: " no-repeat url(https://cdn.pixabay.com/photo/2017/01/25/08/11/unicorn-2007266_960_720.png)" //->
          })), 
            animate('4s ease-out',  style({
              transform: 'scale(0.55) rotateY(360deg) rotateZ(360deg) translateX(0%) translateY(0%)',
              background: " no-repeat url(https://cdn.pixabay.com/photo/2017/01/25/08/11/unicorn-2007266_960_720.png)" //o
          })), 
          ] ),
      ]
    ),
    trigger('itemTaskAnim', [
      transition(':enter', [
        animate('0s ease-out',  style({
          opacity: 0})),
        animate('25s ease-out',  style({
          opacity: 1}))
      ])
      ]),
    
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
            this.db.writeTitleTable(this.userId,"table0","to do")
            this.db.writeTitleTable(this.userId,"table1","doing")
            this.db.writeTitleTable(this.userId,"table2","done")
            this.db.writeTitleTable(this.userId,"table3","table3")
            this.db.writeTitleTable(this.userId,"table4","table4")
            this.db.writeTitleTable(this.userId,"table5","table5")
            this.db.writeTitleTable(this.userId,"table6","table6")
            this.db.writeTitleTable(this.userId,"table7","table7")
            this.db.writeTitleTable(this.userId,"table8","table8")
            this.db.writeTitleTable(this.userId,"table9","table9")
            this.db.writeUserNumber(this.userId,3)
            this.db.writeLogs(this.userId,this.random,this.currentDate,"Create Account","","","","","")
            this.db.writeCategory(this.userId,"date","pink");
            this.db.writeCategory(this.userId,"shop","green");
            this.db.writeCategory(this.userId,"cars","red");
            this.db.writeCategory(this.userId,"school","white");
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
    this.db.getTask(this.userId,"table").subscribe(res => {
      if(res.length==0) 
      {
        this.db.writeUserData(this.userId,this.email,"");
        this.db.writeTitleTable(this.userId,"table0","to do")
        this.db.writeTitleTable(this.userId,"table1","doing")
        this.db.writeTitleTable(this.userId,"table2","done")
        this.db.writeTitleTable(this.userId,"table3","table3");
        this.db.writeTitleTable(this.userId,"table4","table4");
        this.db.writeTitleTable(this.userId,"table5","table5");
        this.db.writeTitleTable(this.userId,"table6","table6");
        this.db.writeTitleTable(this.userId,"table7","table7");
        this.db.writeTitleTable(this.userId,"table8","table8");
        this.db.writeTitleTable(this.userId,"table9","table9");
        this.db.writeCategory(this.userId,"date","pink");
        this.db.writeCategory(this.userId,"shop","green");
        this.db.writeCategory(this.userId,"cars","red");
        this.db.writeCategory(this.userId,"school","white");
        this.db.writeUserNumber(this.userId,3);
      }
    });
  this.router.navigate(['/dashboard'])
})
}
}
