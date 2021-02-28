import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationStackComponent } from './navigation-stack.component';

describe('NavigationStackComponent', () => {
  let component: NavigationStackComponent;
  let fixture: ComponentFixture<NavigationStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationStackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
