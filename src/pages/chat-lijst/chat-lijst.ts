import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmployeeProvider } from './../../providers/employee/employee';
import { ChatPage } from '../chat/chat';

/**
 * Generated class for the ChatLijstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-lijst',
  templateUrl: 'chat-lijst.html',
})
export class ChatLijstPage {
    public employees;

  constructor(public navCtrl: NavController, public navParams: NavParams, public empProv: EmployeeProvider) {
  }

  ionViewDidEnter() {
    this.empProv.createPouchDB();

    this.empProv.read()
      .then(employees => {
        this.employees = employees;
      }).catch((err) => { console.log(err)} );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatLijstPage');
  }

  chatten(){
    this.navCtrl.push(ChatPage);
  }

}
