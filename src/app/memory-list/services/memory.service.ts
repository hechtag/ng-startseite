import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Memory } from '../shared/memory';

@Injectable()
export class MemoryService {
  private localStorageKey = 'memories';
  private memories$: BehaviorSubject<Memory[]>;

  addMemory(memoryString: string) {
    const mems = this.memories$.value;
    mems.unshift(new Memory(memoryString));
    this.setStorage(mems);
    this.memories$.next(this.getFromStorage());
  }

  getMemories(): Observable<Memory[]> {
    return this.memories$;
  }

  private getFromStorage(): Memory[] {
    const mems = localStorage.getItem(this.localStorageKey);
    return JSON.parse(mems);
  }

  private setStorage(mems: Memory[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(mems));
  }

  constructor() {
    this.memories$ = new BehaviorSubject(this.getFromStorage());
  }
}
