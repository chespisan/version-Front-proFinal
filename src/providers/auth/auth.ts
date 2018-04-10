import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// Modelo Usuario
import { Usuario } from '../../models/usuario.model';


//Config Url
import { URL_SERVICIOS } from '../../config/config';



@Injectable()
export class AuthProvider {

 

  constructor(
    public http: HttpClient,
    public alertCtrl: AlertController,
    public storage: Storage
    ) {
    console.log('Hello AuthProvider Provider');
  }

  // Metodo crear usuario, como parametro enviamos usuario de modelo Usuario
  crearUsuario( usuario: Usuario){

    // creamos la variable que contendra ruta del server
    let url = URL_SERVICIOS + '/usuario';

    // devolvemos la peticion al servidor
    return this.http.post( url, usuario )
        // utilixaremos el operador map, que nos permite tomar la respuesta y transofrmarla
            .map( (res: any) => {

              // creamops un mensaje de alerta para cuando nuestros usuarios se registren
                let alert = this.alertCtrl.create({
                  title: `Bienvenid@! ${usuario.nombre}`,
                  subTitle: 'Gracias por registrarte!',
                  buttons: ['OK']
                });
                alert.present();
              
              return res.usuario;
            });
  };

  //Metodo de login
  login( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/login';

    //retornamos la peticion de logueo al servidor y la almacenamos en localStorage
    return this.http.post( url, usuario )
                .map(( res: any )=>{

                  /*
                  localStorage.setItem('id',res.id);
                  localStorage.setItem('token',res.token);
                  localStorage.setItem('usuario', JSON.stringify(res.usuario));
                  */

                 // guardamos en el storage la informacion del usuario
                 this.storage.set('id',res.id);
                 this.storage.set('token',res.token);
                 this.storage.set('usuario', JSON.stringify(res.usuario));

                  return true;
                });


  }

}
