import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorLookupComponent } from './Components/actor-lookup/actor-lookup.component';

const routes: Routes = [
  { path: 'title/:tid', component: ActorLookupComponent},
  { path: 'title/:tid/character/:cn/:aid', component: ActorLookupComponent},
  { path: '', component: ActorLookupComponent},
  { path: '**', component: ActorLookupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
