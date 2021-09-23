import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorLookupComponent } from './actor-lookup.component';

describe('ActorLookupComponent', () => {
  let component: ActorLookupComponent;
  let fixture: ComponentFixture<ActorLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActorLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
