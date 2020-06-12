import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsChatComponent } from './friends-chat.component';

describe('FriendsChatComponent', () => {
  let component: FriendsChatComponent;
  let fixture: ComponentFixture<FriendsChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
