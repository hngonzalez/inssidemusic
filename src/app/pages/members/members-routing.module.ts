import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedUserGuard } from 'src/app/guards/logged-user.guard';
import { InicioComponent } from "./inicio/inicio.component";
import { TopComponent } from './top/top.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent, canActivate: [LoggedUserGuard] },
  { path: 'top', component: TopComponent, canActivate: [LoggedUserGuard] },
  { path: '**', pathMatch: 'full', redirectTo:'inicio', canActivate: [LoggedUserGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
