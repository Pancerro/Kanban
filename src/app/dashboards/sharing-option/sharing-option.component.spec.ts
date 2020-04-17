import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharingOptionComponent } from './sharing-option.component';

describe('SharingOptionComponent', () => {
  let component: SharingOptionComponent;
  let fixture: ComponentFixture<SharingOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharingOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharingOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
