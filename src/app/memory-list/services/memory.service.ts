import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class MemoryService {

  private memories: string[] = ['asd'];
  addMemory(memoryString: string) {
    this.memories.push(memoryString);
  }

  getMemories(): Observable<string[]> {
    return of(this.memories);
  }

  constructor() { }
}
