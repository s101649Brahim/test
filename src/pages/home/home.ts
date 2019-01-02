import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { EmployeeProvider } from './../../providers/employee/employee';
import { ChatLijstPage } from '../chat-lijst/chat-lijst';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private chatLijstPage : ChatLijstPage; //= ChatLijstPage;
  public employees;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public empProv: EmployeeProvider
  ) {}

  ionViewDidEnter() {
    this.empProv.createPouchDB();

    this.empProv.read()
      .then(employees => {
        this.employees = employees;
      }).catch((err) => { console.log(err)} );
  }

  showDetails(employee) {
    let modal = this.modalCtrl.create('EmployeePage', { employee: employee });
    modal.onDidDismiss(data => {
      this.reReadEmployees();
    });
    modal.present();
  }

  addEmployee() {
    let modal = this.modalCtrl.create('EmployeePage', { employee: null });
    modal.onDidDismiss(data => {
      this.reReadEmployees()
    });
    modal.present();
  }

  readChat() {
    this.navCtrl.push('ChatLijstPage');
  }

  reReadEmployees() {
    this.empProv.read()
      .then(employees => {
        this.employees = employees;
      }).catch((err) => { console.log(err)} );
  }

  logout(){
    this.navCtrl.setRoot(LoginPage);
  }
}
