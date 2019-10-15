import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLinkComponent } from './card-link.component';
import { CardComponent } from './card/card.component';

describe('CardLinkComponent', () => {
  let component: CardLinkComponent;
  let fixture: ComponentFixture<CardLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardLinkComponent, CardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
