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
import { MatFormFieldModule,  MatDialogModule,MatInputModule, MatButtonModule, MatNativeDateModule} from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';
import { WelcomePageComponent } from './user/welcome-page/welcome-page.component';
import { RegisterComponent } from './modal/register/register.component';
import { FormsModule } from '@angular/forms';
import { DashboardsComponent } from './dashboards/dashboards/dashboards.component';
import { LoginComponent } from './modal/login/login.component';
import {MatIconModule} from '@angular/material/icon';
import { AddTaskComponent } from './modal/add-task/add-task.component';
import {MatSelectModule} from '@angular/material/select';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { EditTaskComponent } from './modal/edit-task/edit-task.component';
import { EditTableNameComponent } from './modal/edit-table-name/edit-table-name.component';
import { LogiComponent } from './dashboards/logi/logi.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { SettingsComponent } from './dashboards/settings/settings.component';
import {MatTableModule} from '@angular/material/table';
@NgModule({
  entryComponents: [RegisterComponent,LoginComponent,AddTaskComponent,EditTaskComponent,EditTableNameComponent],
  declarations: [
    AppComponent,
    WelcomePageComponent,
    RegisterComponent,
    DashboardsComponent,
    LoginComponent,
    AddTaskComponent,
    EditTaskComponent,
    EditTableNameComponent,
    LogiComponent,
    SettingsComponent
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
    MatSelectModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
