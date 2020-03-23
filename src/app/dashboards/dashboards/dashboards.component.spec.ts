import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardsComponent } from './dashboards.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { RecaptchaModule } from 'ng-recaptcha';
import { MatButtonModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatGridListModule, MatIconModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatTableModule, MatSortModule, MatSidenavModule, MatMenuModule, MatCheckboxModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ColorPickerModule } from 'ngx-color-picker';
import { GravatarModule } from 'ngx-gravatar';
import { RegisterComponent } from 'src/app/modal/register/register.component';
import { LoginComponent } from 'src/app/modal/login/login.component';
import { AddTaskComponent } from 'src/app/modal/add-task/add-task.component';
import { EditTaskComponent } from 'src/app/modal/edit-task/edit-task.component';
import { EditTableNameComponent } from 'src/app/modal/edit-table-name/edit-table-name.component';
import { AddCategoryComponent } from 'src/app/modal/add-category/add-category.component';
import { EditCategoryComponent } from 'src/app/modal/edit-category/edit-category.component';
import { CreateNewKanbanComponent } from 'src/app/modal/create-new-kanban/create-new-kanban.component';
import { DeleteOptionComponent } from 'src/app/modal/delete-option/delete-option.component';
import { AppComponent } from 'src/app/app.component';
import { WelcomePageComponent } from 'src/app/user/welcome-page/welcome-page.component';
import { LogiComponent } from '../logi/logi.component';
import { SettingsComponent } from '../settings/settings.component';
import { ResetPasswordComponent } from 'src/app/user/reset-password/reset-password.component';
import { MenuComponent } from '../menu/menu.component';
import { ScrollToBottomDirective } from '../scroll-to-bottom.directive/scroll-to-bottom.directive.component';

describe('DashboardsComponent', () => {
  let component: DashboardsComponent;
  let fixture: ComponentFixture<DashboardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
  
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
        SettingsComponent,
        ResetPasswordComponent,
        AddCategoryComponent,
        EditCategoryComponent,
        CreateNewKanbanComponent,
        MenuComponent,
        ScrollToBottomDirective,
        DeleteOptionComponent,
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
        MatTableModule,
        ColorPickerModule,
        MatSortModule,
        MatSidenavModule,
        MatMenuModule,
        GravatarModule,
        MatCheckboxModule
      ],
      providers: [],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 

  
  
});
