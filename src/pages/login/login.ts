import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { EmployeeProvider } from './../../providers/employee/employee';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  firstName:string;
  employees: any = {};
  accesLogin: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public empProv: EmployeeProvider,
    private alertCtrl: AlertController
    ) {}

  ionViewDidEnter() {
    this.empProv.createPouchDB();

    this.empProv.read()
      .then(employees => {
        this.employees = employees;
      }).catch((err) => { console.log(err)} );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: "User doesn't exist",
      subTitle: 'Deze account bestaat nog niet',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  login(){
    this.employees.filter((emp) => {
      if (emp.doc.firstName == this.firstName){
        this.accesLogin = true;
      }
    })


    if (this.accesLogin){
      this.navCtrl.setRoot(HomePage);
    }
    else {
      this.presentAlert();
    }
  }


}
