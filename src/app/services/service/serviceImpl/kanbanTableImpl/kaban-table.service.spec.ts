import { TestBed } from '@angular/core/testing';

import { KabanTableService } from './kaban-table.service';

describe('KabanTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KabanTableService = TestBed.get(KabanTableService);
    expect(service).toBeTruthy();
  });
});
