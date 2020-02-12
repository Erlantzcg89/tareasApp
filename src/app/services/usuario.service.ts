import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { USUARIOS } from '../model/constantes';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private isLogged: boolean;
  private usuario: Usuario;
  private usuarios: Array<any>;
  private sesion: Usuario;

  constructor() {
    console.trace('UsuarioService constructor');
    this.isLogged = false;
    this.usuario = undefined;
    this.usuarios = USUARIOS;

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

    this.usuarios.forEach(el => {

      if (el.nombre === nombre && el.password === password) {

        this.isLogged = true;
        this.sesion = new Usuario();
        this.sesion.nombre = el.nombre;
        this.sesion.password = '';
        this.sesion.repo = el.repo;

      }

    });

    if (this.isLogged) {
      console.trace('usuario encontrado');

      sessionStorage.setItem('usuario', JSON.stringify(this.sesion));

    } else {
      console.trace('usuario NO encontrado');
      this.isLogged = false;
    }

    return this.sesion;
  }// login

  getSesion() {
    this.sesion = JSON.parse(sessionStorage.getItem('usuario'));
    return this.sesion;
  }// getSesion

  cerrarSesion() {
    console.trace('UsuarioService cerrarSesion');
    this.isLogged = false;
    sessionStorage.removeItem('usuario');
  }

}// UsuarioService