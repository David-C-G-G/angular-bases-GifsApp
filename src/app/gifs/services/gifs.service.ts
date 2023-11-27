import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

//creando nombre constante de la llave de la API
//const GIPHY_API_KEY = 'BkXM7ejdLBxOXfuw2gryzzv5rcHG4MUb'

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifsList: Gif[] = [];

  //propiedad que llamamos de giphy para obtener gifs
  //private apiKey: string = GIPHY_API_KEY;
  private _tagsHistory:   string[] = [];
  private apiKey:         string = 'BkXM7ejdLBxOXfuw2gryzzv5rcHG4MUb';
  private serviceUrl:     string = 'https://api.giphy.com/v1/gifs';


  constructor( private http: HttpClient ) { }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizedHistory(tag: string){
    tag = tag.toLowerCase();

    //comprobar existencia del tag
    if(this._tagsHistory.includes(tag)){
      //removiendo el tag de la ultima posicion (podemos usar cualquier tag el del getter o el privado)
      //filter regresa un arreglo pero solo con los elementos que cumplen con la condicion
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag)
    }

    //inserta el tag al inicio del arreglo
    this._tagsHistory.unshift(tag);

    //limitando el arreglo a 10 elementos unicamente
    this._tagsHistory = this._tagsHistory.splice(0,10);
  }

  //para usar el ejemplo comentado se pone async searchTag() antes del metodo
  //y Promise desdpues de parentesis ejemplo ():Promise<void>
  searchTag( tag: string):void {

    //validación para que al presionar enter sin tener nada escrito se alamacene en mi array de tags
    if(tag.length === 0)return;

    //manda a llamar el método para organizar el tag
    this.organizedHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag)


    // obejto es un observable, permite emitir valores para este caso solo emite un valor (no continuo)
    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, {params})
    .subscribe(resp =>{

      this.gifsList = resp.data;
      //console.log({gifs: this.gifsList});

    });

    //unshif inserta el nuevo elemento en el arreglo (tag)
    //this._tagsHistory.unshift(tag);

    //ejemplo de peteicion http con javascript usando fetch
    //const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=BkXM7ejdLBxOXfuw2gryzzv5rcHG4MUb&q=valorant&limit=10')
    //const data = await resp.json();
    //console.log(data);

  }

}
