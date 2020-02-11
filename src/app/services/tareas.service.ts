import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Tarea } from '../model/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  constructor(private http: HttpClient) {

    console.trace("TareasService Constructor");

  }

  listar(): Observable<Tarea[]> {
    const url = `http://localhost:3000/tareas/`;
    console.trace('TareasService tareas' + url);
    return this.http.get<Tarea[]>(url);
  }

  detalle(id: number): Observable<Tarea> {
    const url = `http://localhost:3000/tareas/{{id}}`;
    console.trace('TareasService tareas' + url);
    return this.http.get<Tarea>(url);
  }

  public crear(tarea: Tarea): Observable<Tarea> {
    const url = `http://localhost:3000/tareas/`;
    return this.http.post<Tarea>(url, tarea);
  }

  public modificar(tarea: Tarea): Observable<Tarea> {
    const url = `http://localhost:3000/tareas/${tarea.id}`;
    return this.http.put<Tarea>(url, tarea);
  }

  public borrar(id: number): Observable<Tarea> {
    const url = `http://localhost:3000/tareas/${id}`;
    return this.http.delete<Tarea>(url);
  }
}