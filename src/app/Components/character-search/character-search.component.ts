import {Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import {merge, Observable, OperatorFunction, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import { CastSearchResponse, ActorSearchResponse, CharacterSearchResult, CastSearchResult } from 'src/app/Modelling/ResponseModels';

export interface CharacterSelection
{
  characterName : string;
  actorId : string;
}

@Component({
  selector: 'app-character-search',
  templateUrl: './character-search.component.html',
  styleUrls: ['./character-search.component.scss']
})

export class CharacterSearchComponent implements OnInit {

@Output() onCharacterSelected = new EventEmitter<CharacterSelection>();
@Output() onNewSearchRequested = new EventEmitter();
@Input() lookupResults! : CastSearchResult;
@Input() autoFocus! : boolean;
@ViewChild('inputBox') inputBox! : ElementRef; 
@ViewChild('instance') instance!: NgbTypeahead;

focus$ = new Subject<string>();
click$ = new Subject<string>();

ready = true;
actorSearching : boolean = false;
model: any;

  constructor() { }

  ngOnInit(): void {
    this.actorSearching = false;
    if (this.autoFocus) 
    {
      setTimeout(()=>{
        this.inputBox.nativeElement.focus()
      })
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('lookupResults')) {
        if (!changes['lookupResults'].isFirstChange()) {
          
        }
    }
  }

  search: OperatorFunction<string, CastSearchResponse[]> = (text$: Observable<string>) => {

    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance!.isPopupOpen()));
    const inputFocus$ = this.focus$;

     return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => this.lookupResults.fullCast.filter(r => r.characterName.toLowerCase().indexOf(term.toLowerCase()) > -1))
  )}


  FormatCastResultValue(value: CastSearchResponse) {       
    return value.characterName;
  } 

  onValueSelected($event : NgbTypeaheadSelectItemEvent<CastSearchResponse>)
  {
     this.actorSearching = true;
     this.inputBox.nativeElement.blur();
     
     let selection : CharacterSelection = {
       characterName: $event.item.characterName, 
       actorId: $event.item.actor.id
     }

     this.onCharacterSelected.emit(selection)
  }


  onClearClicked() : void 
  {
    this.inputBox.nativeElement.value = "";
  }

  onNewSearchClicked() : void 
  {
    this.onNewSearchRequested.emit();
  }
  
  setSearchCompleted()
  {
    this.actorSearching = false;
  }

}
