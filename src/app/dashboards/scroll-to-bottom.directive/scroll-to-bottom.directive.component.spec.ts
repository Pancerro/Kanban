import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollToBottom.DirectiveComponent } from './scroll-to-bottom.directive.component';

describe('ScrollToBottom.DirectiveComponent', () => {
  let component: ScrollToBottom.DirectiveComponent;
  let fixture: ComponentFixture<ScrollToBottom.DirectiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollToBottom.DirectiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollToBottom.DirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
