import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewKanbanComponent } from './create-new-kanban.component';

describe('CreateNewKanbanComponent', () => {
  let component: CreateNewKanbanComponent;
  let fixture: ComponentFixture<CreateNewKanbanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewKanbanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
