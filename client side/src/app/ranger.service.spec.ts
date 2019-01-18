import { TestBed, inject } from '@angular/core/testing';

import { RangerService } from './ranger.service';

describe('HeroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RangerService]
    });
  });

  it('should be created', inject([RangerService], (service: RangerService) => {
    expect(service).toBeTruthy();
  }));
});
