import { Component, OnInit } from '@angular/core';
import { MemoryService } from './services/memory.service';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Memory } from './shared/memory';
import { ModalService } from '../core/modal.service';

@Component({
  selector: 'app-memory-list',
  templateUrl: './memory-list.component.html',
  styleUrls: ['./memory-list.component.scss']
})
export class MemoryListComponent implements OnInit {

  public memoryString: string;
  public memoryList: Memory[] = [];
  public toDoMemoryList$: Observable<Memory[]>;
  public doneMemoryList$: Observable<Memory[]>;
  constructor(
    private memoryService: MemoryService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this.toDoMemoryList$ = this.memoryService.getMemories()
      .pipe(map(array => array.filter(m => !m.done)));
    this.doneMemoryList$ = this.memoryService.getMemories()
      .pipe(map(array => array.filter(m => m.done)));
  }

  addMemory() {
    if (this.memoryString) {
      this.memoryService.addMemory(this.memoryString);
      this.memoryString = '';
    }
  }

  isDone(id: string) {
    this.memoryService.isDone(id);
  }

  hardReset(content) {
    // TODO überprüfen
    this.modalService.open(content).subscribe(result => {
      if (result) {
        this.memoryService.hardReset();
      }
    });
  }
}
