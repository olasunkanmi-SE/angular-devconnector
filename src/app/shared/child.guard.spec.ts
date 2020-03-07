import { TestBed, async, inject } from '@angular/core/testing';

import { ChildGuard } from './child.guard';

describe('ChildGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChildGuard]
    });
  });

  it('should ...', inject([ChildGuard], (guard: ChildGuard) => {
    expect(guard).toBeTruthy();
  }));
});
