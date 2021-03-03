import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DisciplinesComponent } from './disciplines.component';

describe('DisciplinesComponent', () => {
  let component: DisciplinesComponent;
  let fixture: ComponentFixture<DisciplinesComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DisciplinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisciplinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
