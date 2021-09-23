import {Component, ElementRef, EventEmitter, Output, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import {Observable, of, OperatorFunction} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, tap, switchMap} from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { TitleSearchResponse, CastSearchResult } from 'src/app/Modelling/ResponseModels';
import { SearchService } from 'src/app/Services/SearchService';

@Component({
  selector: 'app-title-search',
  templateUrl: 'title-search.component.html',
  providers: [SearchService],
  styleUrls: ['./title-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TitleSearchComponent {
  @Output() onTitleSelected = new EventEmitter<string>();
  @ViewChild('inputBox') inputBox! : ElementRef; 
  
  model: any;
  searching = false;
  searchFailed = false;
  searchResponse : TitleSearchResponse[] = [];
  castSearching : boolean = false;
  
  constructor(private _service: SearchService) {}

  ngOnInit(): void {
    this.searching = false;
    setTimeout(()=>{
      this.inputBox.nativeElement.focus()
    })
  }

  
  search: OperatorFunction<string, TitleSearchResponse[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term => (term != null && term != "") ?
        this._service.searchTitles(term).pipe(
          tap((response) => {
            this.searchFailed = false;
          }),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })) : []
      ),
      tap(() => this.searching = false)
    )

    FormatTitleResultValue(value: TitleSearchResponse) {       
      if (value.endYear !== "")
      {
        return `${value.primaryTitle} (${value.startYear} - ${value.endYear}) (${value.titleType})`;
      }     
      else if (value.startYear !== "")
      {
        return `${value.primaryTitle} (${value.startYear}) (${value.titleType})`;
      }
      else
      {
        return `${value.primaryTitle} (${value.titleType})`;
      }
    } 

    onValueSelected($event : NgbTypeaheadSelectItemEvent<TitleSearchResponse>)
    {
       this.castSearching = true;
       this.inputBox.nativeElement.blur();
       this.onTitleSelected.emit($event.item.tConst);
    }


  onClearClicked() : void 
  {
    this.inputBox.nativeElement.value = "";
  }

  setSearchCompleted()
  {
    this.searching = false;
  }

}