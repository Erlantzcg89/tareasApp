import { Component, OnInit } from '@angular/core';
import { Tarea } from 'src/app/model/tarea';
import { TareasService } from 'src/app/services/tareas.service';
import { Alerta } from 'src/app/model/alerta';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.scss']
})
export class TareasComponent implements OnInit {
  public get usuarioService(): UsuarioService {
    return this._usuarioService;
  }
  public set usuarioService(value: UsuarioService) {
    this._usuarioService = value;
  }

  tareas: Array<Tarea>;
  tituloTarea: string;
  alerta: Alerta;
  habilitado: boolean;

  constructor(private tareasService: TareasService,
    private router: Router,
    private _usuarioService: UsuarioService) {

    console.trace('TareasComponent constructor');
    this.tareas = [];
    this.tituloTarea = '';
    this.alerta = undefined;
    this.habilitado = false;

  }// constructor

  ngOnInit() {

    console.trace('TareasComponent ngOnInit');

    this.onGet();

    // setInterval(() => {
    //   this.onGet();
    // }, 5000);

  }// oninit

  onGet() {

    this.tareasService.listar().subscribe(
      datos => {
        console.debug('get tareas ok %o', datos);
        this.tareas = datos;

      },
      error => {
        console.warn(error);

        this.alerta = new Alerta();
        this.alerta.tipo = 'danger';
        this.alerta.cuerpo = 'Aplicación fuera de servicio';
      }
    )

  }// onGet

  onCheck(t: Tarea) {
    console.trace('onCheck tarea: %o', t);

    t.completada = !t.completada

    this.tareas.splice(this.tareas.indexOf(t), 1, t);

    this.tareasService.modificar(this.tareas).subscribe(
      data => {
        console.debug('tarea chequeada (modificar) ok %o', data);

        this.onGet();

        // this.alerta = new Alerta();
        // this.alerta.tipo = 'success';
        // this.alerta.cuerpo = 'Tarea: "' + t.titulo + '" borrada con éxito';
        // console.log('alerta: %o', this.alerta);
      },
      error => {
        console.warn(error);
      }
    );

  }// onCheck

  onBorrar(t: Tarea) {
    console.trace('onBorrar id: %o', t);

    this.tareas.splice(this.tareas.indexOf(t), 1);

    this.tareasService.modificar(this.tareas).subscribe(
      data => {
        console.debug('tarea borrada (modificar) ok %o', data);

        this.onGet();

        // this.alerta = new Alerta();
        // this.alerta.tipo = 'success';
        // this.alerta.cuerpo = 'Tarea: "' + t.titulo + '" borrada con éxito';
        // console.log('alerta: %o', this.alerta);
      },
      error => {
        console.warn(error);
      }
    );

  }// onBorrar

  onCrear(titulo: string) {
    console.trace('onUpdate tarea: %s', titulo);

    if (this.tituloTarea.trim() !== '') {

      let t = new Tarea();
      t.titulo = titulo;
      if (this.tareas.length > 0) {
        t.id = this.tareas[this.tareas.length - 1].id;
        t.id++;
      }

      this.tareas.push(t);

      this.tareasService.modificar(this.tareas).subscribe(
        data => {
          console.debug('tarea creada (modificar) ok %o', data);

          this.onGet();

          // this.alerta = new Alerta();
          // this.alerta.tipo = 'success';
          // this.alerta.cuerpo = 'Tarea: "' + t.titulo + '" borrada con éxito';
          // console.log('alerta: %o', this.alerta);
        },
        error => {
          console.warn(error);
        }
      );

    } else {

      this.alerta = new Alerta();
      this.alerta.tipo = 'warning';
      this.alerta.cuerpo = 'Tarea vacía';

    }

  }// onCrear

  onModificar(titulo: string, t: Tarea) {
    console.trace('onModificar tarea: %s %o', titulo, t);

    if (titulo !== t.titulo && titulo) {

      if (titulo.trim() !== '') {

        t.titulo = titulo;

        this.tareas.splice(this.tareas.indexOf(t), 1, t);

        this.tareasService.modificar(this.tareas).subscribe(
          data => {
            console.debug('tarea modificada ok %o', data);

            this.onGet();

            // this.alerta = new Alerta();
            // this.alerta.tipo = 'success';
            // this.alerta.cuerpo = 'Tarea: "' + t.titulo + '" borrada con éxito';
            // console.log('alerta: %o', this.alerta);
          },
          error => {
            console.warn(error);
          }
        );

      } else {

        this.alerta = new Alerta();
        this.alerta.tipo = 'warning';
        this.alerta.cuerpo = 'Aviso: Escribe un titulo para la tarea';

      }// titulo ha cambiado pero es incorrecto

    }// si el titulo ha cambiado

  }// onModificar

  onSalir() {
    console.trace('TareasComponent onSalir');

    this.usuarioService.cerrarSesion();
    this.router.navigate(['']);

  }// salir

}// TareasCoponent
