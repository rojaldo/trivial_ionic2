import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RequestProvider } from '../../providers/request/request';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private questionCards: Array<QuestionCard> = [];

  constructor(private request: RequestProvider, public navCtrl: NavController) {

    this.request.http.get('https://opentdb.com/api.php?amount=10').subscribe(
      (data) => {
        this.processData(data.json());
        console.log(data);
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log("completed");
      }
    );
  }

  processData(input: any) {
    for (let index = 0; index < input.results.length; index++) {
      let aux: Array<string> = [];
      aux = input.results[index].incorrect_answers;
      aux.push(input.results[index].correct_answer);
      aux = this.shuffle(aux);
      let newQuestionCard: QuestionCard = new QuestionCard(input.results[index].question,
        aux, input.results[index].correct_answer);
      this.questionCards.push(newQuestionCard);
    }
  }

  shuffle(a):string[] {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
  }

  checkAnswer(response: string, questionCard: QuestionCard, index: number): void {
    if (response === questionCard.rightAnswer) {
      this.questionCards[index].answered = true;
      this.questionCards[index].result = true;
    } else {
      this.questionCards[index].answered = true;
      this.questionCards[index].result = false;
    }
  }

  doInfinite(infiniteScroll:any):void{
    this.request.http.get('https://opentdb.com/api.php?amount=10').subscribe(
      (data) => {
        this.processData(data.json());
        console.log(data);
        infiniteScroll.complete();
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log("completed");
      }
    );
  }

}

class QuestionCard {
  constructor(public question: string, public responses: string[], public rightAnswer: string, public answered?: boolean, public result?: boolean) {

  }
}
