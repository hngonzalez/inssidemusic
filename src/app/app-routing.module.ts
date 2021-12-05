import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Notfound404Component } from './pages/notfound404/notfound404.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'members', loadChildren: () => import('./pages/members/members.module').then(m => m.MembersModule) },
  { path: 'notfound', component: Notfound404Component},
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
