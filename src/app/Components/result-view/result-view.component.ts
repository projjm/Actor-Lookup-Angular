import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CharacterSearchResult } from 'src/app/Modelling/ResponseModels';
import { parse } from 'date-fns';
import format from 'date-fns/format'

@Component({
  selector: 'app-result-view',
  templateUrl: './result-view.component.html',
  styleUrls: ['./result-view.component.scss']
})
export class ResultViewComponent implements OnInit {
  @Input() characterResult! : CharacterSearchResult;
  actorImdbUrl : string = "https://www.imdb.com/name/";
  actorDead : boolean = false;
  birthFormatted! : string;
  deathFormatted? : string;

  constructor() { }

  ngOnInit(): void {
    let birth = parse(this.characterResult.actorInfo.birthDate, 'yyyy-mm-dd', new Date());
    this.birthFormatted = format(birth, "PPP");

    let d = this.characterResult.actorInfo.deathDate;
    if (d != null && d != "")
    {
      let death = parse(this.characterResult.actorInfo.deathDate, 'yyyy-mm-dd', new Date());
      this.deathFormatted = format(death, "PPP");
    }
  }
}
