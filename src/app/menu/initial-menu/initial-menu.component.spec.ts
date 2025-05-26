import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialMenuComponent } from './initial-menu.component';

describe('InitialMenuComponent', () => {
  let component: InitialMenuComponent;
  let fixture: ComponentFixture<InitialMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitialMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
