import { Component } from '@angular/core';
import questions from './questionsContent.json';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'answer-app';

  questionsList = questions;
  check = false;
  score = 0;
  explanation = '';

  selectedOption = '';

  closeResult = '';

  constructor(private modalService: NgbModal) {}

  onSubmit(i, content_success, content_failure) {
    this.check = false;
    this.explanation = '';
    var x = this.questionsList[i].correct;
    var y = this.questionsList[i].explanation;
    if (x === this.selectedOption) {
      this.check = true;
      this.score++;
      this.explanation = y;
      if (this.score >= 3) {
        this.score = 3;
      }
      this.modalService
        .open(content_success, { ariaLabelledBy: 'modal-basic-title' })
        .result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        });
    } else {
      this.modalService
        .open(content_failure, { ariaLabelledBy: 'modal-basic-title' })
        .result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        });
    }
  }
  handleChange(value) {
    this.selectedOption = value.value;
  }
}
