import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common'
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ColourService } from 'src/app/Services/colour.service';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { CharacterSearchComponent, CharacterSelection } from '../character-search/character-search.component';
import { CastSearchResult, CharacterSearchResult } from 'src/app/Modelling/ResponseModels';
import { SearchService } from 'src/app/Services/SearchService';
import { TitleSearchComponent } from '../title-search/title-search.component';

enum PageState
{
  Home,
  Searched
}

enum SearchState
{
  TitleSearch,
  CharacterSearch,
  ResultsView
}

enum ResultState
{
  Show,
  Hide
}

enum Overlay
{
  AboutApp,
  None
}

@Component({
  templateUrl: './actor-lookup.component.html',
  styleUrls: ['./actor-lookup.component.scss'],
  providers: [ColourService, SearchService, Location],
  encapsulation: ViewEncapsulation.None
})

export class ActorLookupComponent implements OnInit {

  darkModeEnabled : boolean = false;
  constructor(
    private colourService : ColourService,
    private route: ActivatedRoute,
    private searchService : SearchService,
    private router : Router,
    private location: Location
  ) {}

  ngOnInit(): void
  {
    this.colourService.load();
    this.darkModeEnabled = (this.colourService.currentActive() === "dark");

    this.tid = this.route.snapshot.paramMap.get('tid');
    this.cn  = this.route.snapshot.paramMap.get('cn');
    this.aid = this.route.snapshot.paramMap.get('aid');
  
    this.executeRouteParameters();
  }
  
  @ViewChild('titleSearch') private titleSearch!: TitleSearchComponent;
  @ViewChild('characterSearch') private characterSearch!: CharacterSearchComponent;

  initialLoad : boolean = true;
  
  currentTitleCast! : CastSearchResult;
  currentCharacterInfo! : CharacterSearchResult;

  searchState : SearchState = SearchState.TitleSearch;
  pageState : PageState = PageState.Home;
  resultState : ResultState = ResultState.Hide;
  currentOverlay : Overlay = Overlay.None;

  tid! : string | null;
  cn! : string | null;
  aid! : string | null;

  executeRouteParameters()
  {
    if (this.tid === null) 
    {
      this.initialLoad = false;
      return;
    }

    this.getTitleCast(this.tid).then(() => 
    {
      if (this.cn == null || this.aid == null)
      {
        this.initialLoad = false;
        return;
      } 

      if (!this.currentTitleCast.fullCast.find(
        (cr) => cr.characterName === this.cn && cr.actor.id === this.aid)) return;

      let request : CharacterSelection = {
        characterName: this.cn,
        actorId: this.aid
      }
      
      this.getCharacterActor(request);
    });
  }

  onTitleSelected(tConst : string) 
  {
    this.location.go(`title/${tConst}`)
    this.getTitleCast(tConst);
  }

  onCharacterSelected(selection : CharacterSelection)
  {
    if (this.currentTitleCast === null) return;
    this.location.go(`title/${this.currentTitleCast.showTConst}/character/${selection.characterName}/${selection.actorId}`)
    this.getCharacterActor(selection);
  }


  getTitleCast(tConst : string) : Promise<boolean>
  {
    return new Promise<boolean>(resolve => 
      {
        if (this.currentTitleCast != null && this.currentTitleCast.showTConst === tConst)
        {
          this.titleSearch.setSearchCompleted();
          this.searchState = SearchState.CharacterSearch;
          resolve(true);
          return;
        }

        this.searchService.searchCast(tConst).subscribe(
          (response) =>
          {
            this.currentTitleCast = {showTConst: tConst, fullCast : response};
            this.titleSearch.setSearchCompleted();
            this.searchState = SearchState.CharacterSearch;
            resolve(true);
          },
          (error) =>
          {
            resolve(false);
          }
        );
      })
  }

  getCharacterActor(selection : CharacterSelection)
  {
      this.searchService.searchActor(selection.actorId).subscribe((response =>
      {
          this.currentCharacterInfo = {
            showTConst : this.currentTitleCast.showTConst, 
            characterName : selection.characterName,
            actorInfo : response
          }
          
          this.characterSearch.setSearchCompleted();
          this.searchState = SearchState.CharacterSearch;
          this.resultState = ResultState.Show;
          this.pageState = PageState.Searched;
          this.initialLoad = false;
      }));
    }

  resetApp()
  {
    this.location.go('');
    this.pageState = PageState.Home;
    this.searchState = SearchState.TitleSearch;
    this.resultState = ResultState.Hide;
    this.currentOverlay = Overlay.None;
  }

  onNewSearchRequested()
  {
    this.searchState = SearchState.TitleSearch;
    this.resultState = ResultState.Hide;
  }

  ShowAbout = () => this.currentOverlay = Overlay.AboutApp;
  HideAbout = () => this.currentOverlay = Overlay.None;

  CheckShowHeaderTitle = () => (this.pageState === PageState.Searched);
  CheckShowAbout = () => (this.currentOverlay === Overlay.AboutApp);
  CheckShowTitleSearch = () => (this.searchState === SearchState.TitleSearch);
  CheckShowCharacterSearch = () =>  (this.searchState === SearchState.CharacterSearch);
  CheckShowResultsView = () =>  (this.resultState === ResultState.Show);

  onSchemeToggled(change : MatSlideToggleChange)
  {
    if (change.checked)
    {
      this.darkModeEnabled = true;
      this.colourService.update("dark");
    }
    else
    {
      this.darkModeEnabled = false;
      this.colourService.update("light");
    }
  }

}
