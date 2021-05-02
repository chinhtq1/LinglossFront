import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchTermComponent } from './search-term.component';

describe('SearchComponent', () => {
  let component: SearchTermComponent;
  let fixture: ComponentFixture<SearchTermComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTermComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
