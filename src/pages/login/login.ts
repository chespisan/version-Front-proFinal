import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { AuthProvider } from '../../providers/auth/auth';
import { Usuario } from '../../models/usuario.model';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  recordar: Boolean
  myForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authService: AuthProvider,
    public http: HttpClient  
  ) {
    this.myForm = this.createMyForm();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginUsuario(){
    console.log(this.myForm.value);

    let usuario = new Usuario(null, this.myForm.value.email, this.myForm.value.password);

    this.authService.login( usuario )
          .subscribe( res => this.navCtrl.push('HomePage'));
  }

  private createMyForm(){
    return this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


  
}
