import { TestBed } from '@angular/core/testing';

import { AllChatService } from './all-chat.service';

describe('AllChatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllChatService = TestBed.get(AllChatService);
    expect(service).toBeTruthy();
  });
});
