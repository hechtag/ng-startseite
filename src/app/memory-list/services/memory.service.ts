import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Memory } from '../shared/memory';
import { IdService } from 'src/app/core/id.service';

@Injectable()
export class MemoryService {
  private localStorageKey = 'memories';
  private memories$: BehaviorSubject<Memory[]>;

  constructor(private idService: IdService) {
    this.memories$ = new BehaviorSubject(this.getFromStorage());
  }

  createMemory(memoryString: string) {
    return new Memory(memoryString, this.idService.getNewId());
  }

  addMemory(memoryString: string) {
    const mems = this.memories$.value;
    mems.unshift(this.createMemory(memoryString));
    this.handleMemories(mems);
  }

  getMemories(): Observable<Memory[]> {
    return this.memories$;
  }
  hardReset() {
    this.handleMemories([]);
  }


  delete(id: string) {
    const newVal = this.memories$.value.filter(m => m.id !== id);
    this.handleMemories(newVal);
  }

  isDone(id: string) {
    const val = this.memories$.value;
    val.find(m => m.id === id).done = true;

    this.handleMemories(val);
  }

  private handleMemories(value: Memory[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(value));
    this.memories$.next(value);
  }

  private getFromStorage(): Memory[] {
    const memString = localStorage.getItem(this.localStorageKey);
    const mems = JSON.parse(memString) as Memory[];
    return !!mems ? mems : [];
  }
}
