import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTableNameComponent } from './edit-table-name.component';

describe('EditTableNameComponent', () => {
  let component: EditTableNameComponent;
  let fixture: ComponentFixture<EditTableNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTableNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTableNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
