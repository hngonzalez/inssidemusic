import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  userLogged:boolean = false;
  formUserLogin!:FormGroup;

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
    localStorage.setItem('userLogged','S');
    this.userLogged = true;
    if (!localStorage.getItem('accessTk')) {
      this.spotifyService.getAccessToken();

    }
    this.router.navigate(['/members/inicio']);
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
