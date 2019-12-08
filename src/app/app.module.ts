import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from 'src/environments/environment';
import { RecaptchaModule } from 'ng-recaptcha';
import { MatFormFieldModule,  MatDialogModule,MatInputModule, MatButtonModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import { WelcomePageComponent } from './user/welcome-page/welcome-page.component';
import { RegisterComponent } from './modal/register/register.component';
import { FormsModule } from '@angular/forms';
import { User } from './class/user';
import { DashboardsComponent } from './dashboards/dashboards/dashboards.component';
import { LoginComponent } from './modal/login/login.component';
import {MatIconModule} from '@angular/material/icon';
@NgModule({
  entryComponents: [RegisterComponent,LoginComponent],
  declarations: [
    AppComponent,
    WelcomePageComponent,
    RegisterComponent,
    DashboardsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RecaptchaModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatGridListModule,
    FormsModule,
    MatIconModule,

  ],
  providers: [User],
  bootstrap: [AppComponent]
})
export class AppModule { }
