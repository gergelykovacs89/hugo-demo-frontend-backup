import { TestBed, inject } from '@angular/core/testing';

import { StoriesGridService } from './stories-grid.service';

describe('StoriesGridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StoriesGridService]
    });
  });

  it('should be created', inject([StoriesGridService], (service: StoriesGridService) => {
    expect(service).toBeTruthy();
  }));
});
