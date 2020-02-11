import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TareasComponent } from './paginas/tareas/tareas.component';


const appRoutes: Routes = [
  { path: '', component: TareasComponent },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(
    appRoutes,
    { enableTracing: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }