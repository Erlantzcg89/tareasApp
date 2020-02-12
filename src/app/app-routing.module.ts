import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TareasComponent } from './paginas/tareas/tareas.component';
import { LoginComponent } from './paginas/login/login.component';
import { LoginGuard } from './guards/login.guard';


const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'inicio', component: TareasComponent, canActivate: [LoginGuard] },
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