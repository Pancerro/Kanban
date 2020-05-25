import { TestBed } from '@angular/core/testing';

import { UserDateService } from './user-date.service';

describe('UserDateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDateService = TestBed.get(UserDateService);
    expect(service).toBeTruthy();
  });
});
