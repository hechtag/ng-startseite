import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Memory } from '../shared/memory';

@Injectable()
export class MemoryService {
  private localStorageKey = 'memories';
  private memories$: BehaviorSubject<Memory[]>;

  constructor() {
    this.memories$ = new BehaviorSubject(this.getFromStorage());
  }

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
    const memString = localStorage.getItem(this.localStorageKey);
    const mems = JSON.parse(memString) as Memory[];
    return !!mems ? mems : [];
  }

  private setStorage(mems: Memory[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(mems));
  }
}
