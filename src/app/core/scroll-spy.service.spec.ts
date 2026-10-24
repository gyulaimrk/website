import { TestBed } from '@angular/core/testing';
import { ScrollSpyService } from './scroll-spy.service';

describe('ScrollSpyService', () => {
  let report: (entries: { isIntersecting: boolean; target: { id: string } }[]) => void;

  beforeEach(() => {
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: typeof report) {
          report = cb;
        }
        observe() {}
        disconnect() {}
      },
    );
  });
  afterEach(() => vi.unstubAllGlobals());

  it('a legutóbb látható szekció lesz az aktív', () => {
    const service = TestBed.inject(ScrollSpyService);
    service.observe([document.createElement('section')]);
    report([
      { isIntersecting: true, target: { id: 'rolam' } },
      { isIntersecting: false, target: { id: 'x' } },
    ]);
    expect(service.active()).toBe('rolam');
    report([{ isIntersecting: true, target: { id: 'tapasztalat' } }]);
    expect(service.active()).toBe('tapasztalat');
  });

  it('IntersectionObserver nélkül nem dob hibát', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    expect(() => TestBed.inject(ScrollSpyService).observe([])).not.toThrow();
  });
});
