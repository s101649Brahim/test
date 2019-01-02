import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { EmployeeProvider } from './../../providers/employee/employee';
import { ImageProvider } from './../../providers/image/image';

@IonicPage()
@Component({
  selector: 'page-employee',
  templateUrl: 'employee.html',
})
export class EmployeePage {
  employee: any = {};
  canDelete = false;
  canUpdate = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private employeeProvider: EmployeeProvider,
    public viewCtrl: ViewController,
    public imgProv: ImageProvider
  ) {}

  ionViewDidEnter() {
    var employee = this.navParams.get('employee');
    if (employee) {
      this.employee = employee.doc;
      this.canDelete = true;
      this.canUpdate = true;
    }
  }

  addOrUpdate() {
    if (this.canUpdate) {
      this.employeeProvider.update(this.employee).catch(() => {});
    }
    else {
      this.employeeProvider.create(this.employee);
    }
    this.viewCtrl.dismiss(this.employee);
  }

  delete() {
    this.employeeProvider.delete(this.employee).catch(() => {});
    this.viewCtrl.dismiss(this.employee);
  }
  takePhotograph() {
  this.imgProv.takePhotograph()
    .then((image) => {
       this.employee._attachments = { 'pic.jpg': {
           content_type: 'image/jpeg',
           data: image.toString()
        }
       }
       console.log(this.employee);
    })
    .catch((err) => {
       console.log(err);
    });
 }
}
