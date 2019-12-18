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
              transform: 'translateX(-80%)',
              background: "no-repeat url('https://data4.cupsell.pl/upload/generator/278278/640x420/4598896_print_1.png?resize=max_sizes&key=55f9a22768eed085006592c1174c0235')"
              ,opacity: 1 ,filter:' grayscale(0%) brightness(100%)'})),
             animate('4s ease-out',  style({
              transform: 'translateX(0%)',
              background: "no-repeat url('https://vignette.wikia.nocookie.net/cartoon-network/images/7/77/Jednorozce.png/revision/latest?cb=20140524124941&path-prefix=pl')"
              ,opacity: 0 ,filter:' grayscale(100%) brightness(100%)'})),
            animate('4s ease-out',  style({
              transform: 'translateX(80%)',
              background: "no-repeat url(https://cdn.pixabay.com/photo/2017/01/25/08/11/unicorn-2007266_960_720.png)",
              opacity: 1 ,filter:' grayscale(0%) brightness(100%)'})),
            animate('4s ease-out',  style({
              transform: 'translateX(5%)',
              background: "no-repeat url(https://cdn.pixabay.com/photo/2017/01/25/08/11/unicorn-2007266_960_720.png)",
              opacity: 1 ,filter:' grayscale(0%) brightness(100%)'})),
              animate('4s ease-out',  style({
                transform: 'translateY(50%)',
                background: "no-repeat url(https://cdn.pixabay.com/photo/2017/01/25/08/11/unicorn-2007266_960_720.png)",
                opacity: 0})),
                animate('4s ease-out',  style({
                  transform: 'translateY(0%)',
                  background: "no-repeat url(https://cdn.pixabay.com/photo/2017/01/25/08/11/unicorn-2007266_960_720.png)",
                  opacity: 1})), 
            
          ] ),
      ]
    ),
    trigger('itemTaskAnim', [
      transition(':enter', [
        animate('0.1s ease-out',  style({
          opacity: 0})),
        animate('23s ease-out',  style({
          opacity: 1}))
      ])
      ])
    
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
