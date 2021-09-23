import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

const LocalStorageColour = 'preferred-colour';

@Injectable({
  providedIn: 'root'
})

export class ColourService {

  renderer: Renderer2;
  scheme! : string;
  colourPrefix : string = "colour-scheme-";

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
   }

   detectPreferredScheme()
   {
    if (window.matchMedia('(prefers-color-scheme)').media !== 'not all')
    {
      this.scheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } 
    else 
    {
      this.scheme = 'light';
    }
   }

   setColourScheme(selected : string)
   {
     this.scheme = selected;
     localStorage.setItem(LocalStorageColour, this.scheme);
   }

   getColourScheme()
   {
     let localStorageColour = localStorage.getItem(LocalStorageColour);
     if (localStorageColour)
     {
       this.scheme = localStorageColour;
     }
     else
     {
       this.detectPreferredScheme();
     }
   }

   load()
   {
     this.getColourScheme();
     this.renderer.addClass(document.body, this.colourPrefix + this.scheme)
   } 

   update(selected : string)
   {
    this.setColourScheme(selected);
    this.renderer.removeClass(document.body, this.colourPrefix + (this.scheme === 'dark' ? 'light' : 'dark'));
    this.renderer.addClass(document.body, this.colourPrefix + selected);
   }

   currentActive() : string
   {
     return this.scheme;
   }
}
