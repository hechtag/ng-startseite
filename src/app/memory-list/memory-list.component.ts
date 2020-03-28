import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { MemoryService } from './services/memory.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Memory } from './shared/memory';
import { ModalService } from '../core/modal.service';
import { Entity } from '../core/entity.model';

@Component({
  selector: 'app-memory-list',
  templateUrl: './memory-list.component.html',
  styleUrls: ['./memory-list.component.scss']
})
export class MemoryListComponent implements OnInit, AfterViewInit {

  public memoryString: string;
  public memoryList: Memory[] = [];
  public toDoMemoryList$: Observable<Entity<Memory>[]>;
  public doneMemoryList$: Observable<Entity<Memory>[]>;

  @ViewChild('memoryBar') memoryBar: ElementRef;
  ngAfterViewInit() {
    this.memoryBar.nativeElement.focus();
  }

  constructor(
    private memoryService: MemoryService,
    private modalService: ModalService,
  ) { }

  ngOnInit() {
    this.toDoMemoryList$ = this.memoryService.getMemories()
      .pipe(map(array => array.filter(m => !m.data.done)));
    this.doneMemoryList$ = this.memoryService.getMemories()
      .pipe(map(array => array.filter(m => m.data.done)));
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

  delete(id: string) {
    this.memoryService.delete(id);
  }


  cleanUp(content) {
    this.modalService.open(content).subscribe(result => {
      if (result) {
        this.memoryService.cleanUpDones();
      }
    });
  }
}
