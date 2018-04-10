import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';


// Imports necewsarias
import { AuthProvider } from '../../providers/auth/auth';
import { Usuario } from '../../models/usuario.model';



@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  myForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public authService: AuthProvider,
    public http: HttpClient,
   
   
    ) {
      this.myForm = this.createMyForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  private createMyForm(){
    return this.formBuilder.group({

      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]

    });
  }

  registrarUsuario(){

    console.log(this.myForm.value);

    // creo una instancia del Modelo Usuario y le envio los campos que el client suministro
    let usuario = new Usuario(
      this.myForm.value.name,
      this.myForm.value.email,
      this.myForm.value.password
    );

    // Metodo para llamar la funcion del servicio, le pasamos como parametro el usuario de la inst y utilizamod le metodo de suscribe que nso devolvera una respuesta satisfactoria
    this.authService.crearUsuario( usuario )
          .subscribe( res => {

            console.log(res);
            // nos lleve al Login
            this.navCtrl.push('LoginPage')
          } ) 

  }

}
