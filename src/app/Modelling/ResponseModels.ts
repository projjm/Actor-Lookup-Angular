export interface CharacterSearchResult
{
  showTConst : string;
  characterName : string;
  actorInfo : ActorSearchResponse;
}

export interface CastSearchResult
{
  showTConst : string;
  fullCast : CastSearchResponse[];
}

export interface TitleSearchResponse {
    primaryTitle: string;
    titleType : string;
    originalTitle : string;
    tConst : string;
    startYear : string;
    endYear : string;
  }
  
  export interface Actor {
    id : string;
    image : string;
    name : string;
    asCharacters : string;
  }
  
  export interface CastSearchResponse {
    characterName : string;
    actor: Actor;
  }

  export interface ActorSearchResponse
    {
        id : string;
        name : string;
        role : string;
        image : string;
        summary : string;
        birthDate : string;
        deathDate : string;
        awards : string;
        height : string;
        knownFors : KnownFor[];
        castMovies : CastMovie[];
        errorMessage : string;
    }

    export interface CastMovie
    {
        id : string;
        role : string;
        title : string;
        year : string;
        description : string;
    }

    export interface KnownFor
    {
        id : string;
        title : string;
        fullTitle : string;
        year : string;
        role : string;
        image : string;
    }