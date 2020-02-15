import { Injectable } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';

@Injectable()
export class ModalService {

  constructor(private modal: NgbModal) { }

  open(content) {
    return from(this.modal.open(content).result);
  }
}
