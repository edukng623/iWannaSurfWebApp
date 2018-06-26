import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotEditComponent } from './spot-edit.component';

describe('SpotEditComponent', () => {
  let component: SpotEditComponent;
  let fixture: ComponentFixture<SpotEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpotEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
