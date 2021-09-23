import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TitleSearchComponent } from './Components/title-search/title-search.component';
import { FormsModule } from '@angular/forms';
import { ResultViewComponent } from './Components/result-view/result-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AboutSiteComponent } from './Components/about-site/about-site.component'; 
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ActorLookupComponent } from './Components/actor-lookup/actor-lookup.component'; 
import { AppRoutingModule } from './app-routing.module';
import { CharacterSearchComponent } from './Components/character-search/character-search.component';

@NgModule({
  declarations: [
    AppComponent,
    TitleSearchComponent,
    CharacterSearchComponent,
    ResultViewComponent,
    AboutSiteComponent,
    ActorLookupComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
