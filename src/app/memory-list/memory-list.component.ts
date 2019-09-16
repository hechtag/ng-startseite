import { Component, OnInit } from '@angular/core';
import { MemoryService } from './services/memory.service';
import { Observable } from 'rxjs';
import { Memory } from './shared/memory';

@Component({
  selector: 'app-memory-list',
  templateUrl: './memory-list.component.html',
  styleUrls: ['./memory-list.component.scss']
})
export class MemoryListComponent implements OnInit {

  public memoryString: string;
  public memoryList: Memory[] = [];
  memoryList$: Observable<Memory[]>;
  constructor(private memoryService: MemoryService) { }
  ngOnInit() {
    this.memoryList$ = this.memoryService.getMemories();
  }

  addMemory() {
    if (this.memoryString) {
      this.memoryService.addMemory(this.memoryString);
      this.memoryString = '';
    }
  }
}
