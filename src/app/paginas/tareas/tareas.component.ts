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

  tareas: Array<Tarea>;
  tituloTarea: string;
  alerta: Alerta;
  habilitado: boolean;

  constructor(private tareasService: TareasService,
    private router: Router,
    private usuarioService: UsuarioService) {

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

  onCheck(tarea: Tarea) {
    console.trace('onCheck tarea: %o', tarea);

    tarea.completada = !tarea.completada

    this.tareasService.modificar(tarea).subscribe(
      data => {
        console.debug('modificar tarea ok %o', data);

        this.onGet();

      },
      error => console.warn(error)
    );

  }// onCheck

  onBorrar(t: Tarea) {
    console.trace('onBorrar id: %o', t.id);

    this.tareasService.borrar(t.id).subscribe(
      data => {
        console.debug('borrar tarea ok %o', data);

        this.onGet();

        // this.alerta = new Alerta();
        // this.alerta.tipo = 'success';
        // this.alerta.cuerpo = 'Tarea: "' + t.titulo + '" borrada con éxito';

      },
      error => console.warn(error)
    );

  }// onBorrar

  onCrear(titulo: string) {
    console.trace('onUpdate tarea: %s', titulo);

    if (this.tituloTarea.trim() !== '') {

      let t = new Tarea();
      t.titulo = titulo;

      this.tareasService.crear(t).subscribe(
        data => {
          console.debug('crear tarea ok %o', data);

          this.tituloTarea = '';

          this.onGet();

          // this.alerta = new Alerta();
          // this.alerta.tipo = 'success';
          // this.alerta.cuerpo = 'Tarea: "' + t.titulo + '" creada con éxito';

        },
        error => {
          console.warn(error);

          this.alerta = new Alerta();
          this.alerta.tipo = 'danger';
          this.alerta.cuerpo = 'Aplicación fuera de servicio';
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

        this.tareasService.modificar(t).subscribe(
          data => {
            console.debug('crear modificada ok %o', data);

            this.onGet();

            // this.alerta = new Alerta();
            // this.alerta.tipo = 'success';
            // this.alerta.cuerpo = 'Tarea: "' + t.titulo + '" modificada con éxito';

            console.log('alerta: %o', this.alerta);
          },
          error => {
            console.warn(error);

            this.alerta = new Alerta();
            this.alerta.tipo = 'danger';
            this.alerta.cuerpo = 'Aplicación fuera de servicio';
          }// servicio no disponible
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
