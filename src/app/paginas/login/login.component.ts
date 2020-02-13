import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor(private router: Router,
    private builder: FormBuilder,
    private usuarioService: UsuarioService) {

    console.trace('LoginComponent constructor');

    this.formulario = this.builder.group({

      // definir los FormControl == inputs [ value, validaciones ]
      nombre: new FormControl('prueba', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      contra: ['prueba', [Validators.required, Validators.minLength(2), Validators.maxLength(8)]]

    });

  }// LoginComponent constructor

  ngOnInit() {
  }// LoginComponent ngOnInit

  enviar(values: any) {
    console.trace('Submit formulario %o', values);

    const nombre = values.nombre;
    const contra = values.contra;
    const sesion = this.usuarioService.login(nombre, contra);

    if (sesion) {
      console.trace('Usuario logeado con exito %o', sesion);
      this.router.navigate(['inicio']);
    } else {
      console.warn('Usuario NO logeado');
      // TODO cambiar alert
      alert('Por favor prueba de nuevo a logearte');
    }

  }// enviar

}// LoginComponent
