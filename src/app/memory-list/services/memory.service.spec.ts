import { TestBed } from '@angular/core/testing';
import { MemoryService } from './memory.service';

describe('MemoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemoryService]
    });
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should be created', () => {
    const service: MemoryService = TestBed.get(MemoryService);

    expect(service).toBeTruthy();
  });
});
