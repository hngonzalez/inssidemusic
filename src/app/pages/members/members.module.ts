import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { PlayerComponent } from './inicio/components/player/player.component';
import { FormsModule } from '@angular/forms';
import { TopComponent } from './top/top.component';

@NgModule({
  declarations: [
    InicioComponent,
    PlayerComponent,
    TopComponent
  ],
  imports: [
    CommonModule,
    MembersRoutingModule,
    FormsModule
  ]
})
export class MembersModule { }
