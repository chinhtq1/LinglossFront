import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDisciplineComponent } from './search-discipline.component';

describe('SearchDisciplineComponent', () => {
  let component: SearchDisciplineComponent;
  let fixture: ComponentFixture<SearchDisciplineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDisciplineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDisciplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
