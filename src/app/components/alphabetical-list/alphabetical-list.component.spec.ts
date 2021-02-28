import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphabeticalListComponent } from './alphabetical-list.component';

describe('AlphabeticalListComponent', () => {
  let component: AlphabeticalListComponent;
  let fixture: ComponentFixture<AlphabeticalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlphabeticalListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlphabeticalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
