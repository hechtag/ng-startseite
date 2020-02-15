import { TestBed } from '@angular/core/testing';

import { CardLinkService } from './card-link.service';

describe('CardLinkService', () => {
  let service: CardLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
