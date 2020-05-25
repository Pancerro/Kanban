import { TestBed } from '@angular/core/testing';

import { AllUserService } from './all-user.service';

describe('AllUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllUserService = TestBed.get(AllUserService);
    expect(service).toBeTruthy();
  });
});
