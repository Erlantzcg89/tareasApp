import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private isLogged: boolean;
  private usuario: Usuario;

  constructor() {
    console.trace('UsuarioService constructor');
    this.isLogged = false;
    this.usuario = undefined;

  }// constructor

  estaLogeado(): boolean {
    console.trace('UsuarioService estaLogeado');

    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));

    if (this.usuario) {
      this.isLogged = true;
    }

    return this.isLogged;
  }

  login(nombre: string, password: string): Usuario {
    console.trace('UsuarioService login nombre %s password %s', nombre, password);
    const NOMBRE = 'admin';
    const PASS = 'admin';
    let sesion: Usuario; // si no entra en el if es "undefined"

    if (NOMBRE === nombre && PASS === password) {
      console.trace('usuario encontrado');
      // crear usuario
      sesion = new Usuario();
      sesion.nombre = nombre;
      sesion.password = password;
      sesion.repo = 'https://api.myjson.com/bins/qxe9w';
      sesion.id = 99;

      this.isLogged = true;

      sessionStorage.setItem('usuario', JSON.stringify(sesion));

    } else {
      console.trace('usuario NO encontrado');
      this.isLogged = false;
    }

    return sesion;
  }// login

  cerrarSesion() {
    console.trace('UsuarioService cerrarSesion');
    this.isLogged = false;
    sessionStorage.removeItem('usuario');
  }

}// UsuarioService