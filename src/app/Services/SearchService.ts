import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { ActorSearchResponse, CastSearchResponse, TitleSearchResponse } from "../Modelling/ResponseModels";

const TITLE_SEARCH_URL = '/api/TitleSearch/';
const CAST_SEARCH_URL = '/api/CastSearch/';
const ACTOR_SEARCH_URL = '/api/ActorSearch/';


@Injectable()
export class SearchService {
    
  constructor(private http: HttpClient) {}

  searchTitles(term: string) {
    return this.http.get<TitleSearchResponse[]>(window.location.origin + TITLE_SEARCH_URL + term)
  }

  searchCast(tConst: string)
  {
    return this.http.get<CastSearchResponse[]>(window.location.origin + CAST_SEARCH_URL + tConst)
  }

  searchActor(tConst: string)
  {
    return this.http.get<ActorSearchResponse>(window.location.origin + ACTOR_SEARCH_URL + tConst);
  }
}