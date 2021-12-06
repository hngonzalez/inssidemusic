import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userLogged:boolean = false;
  formUserLogin!:FormGroup;
  errorUsuario:boolean = false;

  constructor(private router:Router,
              private fb:FormBuilder,
              private spotifyService:SpotifyService) {
    this,this.formUserLogin = this.fb.group({
      'user': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  ngOnInit(): void {
    console.log(localStorage);
    if (localStorage.getItem("userLogged") == "S") {
      this.userLogged = true;
    }
    else {
      this.userLogged = false;
    }
  }

  /**
   * Login del usuario donde se guarda su estado logueado y donde se obtiene el token para la API
   */
  loginUser() {
    let newUser = new User;
    newUser.username = this.formUserLogin.get('user').value;
    newUser.password = this.formUserLogin.get('password').value;

    if (newUser.username.toLowerCase() == 'admin' && newUser.password == '123456') {
      localStorage.setItem('userLogged','S');
      this.userLogged = true;
      this.errorUsuario = false;
      if (!localStorage.getItem('accessTk')) {
        this.spotifyService.getAccessToken();

      }
      this.router.navigate(['/members/inicio']);
    } else {
      this.errorUsuario = true;
    }
  }

  /**
   * Deslogueo del usuario, cambio de ruta y limpieza del localStorage
   */
  logoutUser(){
    localStorage.clear();
    this.userLogged = false;
    this.router.navigate(['/home']);
  }

}
