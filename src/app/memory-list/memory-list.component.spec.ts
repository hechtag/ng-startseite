import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MemoryListComponent } from "./memory-list.component";
import { MemoryService } from "./services/memory.service";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";

describe("MemoryListComponent", () => {
  let component: MemoryListComponent;
  let fixture: ComponentFixture<MemoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemoryListComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: MemoryService,
          useValue: {
            getMemories: () => {
              return of([]);
            },
            addMemory: str => { }
          }
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
