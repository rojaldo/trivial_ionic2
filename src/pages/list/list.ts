import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RequestProvider } from '../../providers/request/request';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  results: Array<any>;

  constructor(private request: RequestProvider, public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.request.http.get('https://api.punkapi.com/v2/beers?page=2&per_page=80').subscribe(
      (data) => {
        this.results = data.json();
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

  }


}
