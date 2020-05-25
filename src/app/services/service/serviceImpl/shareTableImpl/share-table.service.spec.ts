import { TestBed } from '@angular/core/testing';

import { ShareTableService } from './share-table.service';

describe('ShareTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShareTableService = TestBed.get(ShareTableService);
    expect(service).toBeTruthy();
  });
});
