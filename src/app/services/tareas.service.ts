import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Tarea } from '../model/tarea';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private http: HttpClient) {

    console.trace("TareasService Constructor");

  }

  public listar(): Observable<Tarea[]> {
    const url = `https://api.myjson.com/bins/qxe9w`;
    console.trace('TareasService tareas' + url);
    return this.http.get<Tarea[]>(url);
  }

  public modificar(tareas: Array<Tarea>): Observable<Tarea[]> {
    const url = `https://api.myjson.com/bins/qxe9w`;
    return this.http.put<Tarea[]>(url, tareas);
  }

  public listarUsuarios(): Observable<Usuario[]> {
    const url = `https://api.myjson.com/bins/vl7xw`;
    console.trace('TareasService tareas' + url);
    return this.http.get<Usuario[]>(url);
  }

}