import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  //inyectando el servicio de gifs
  //private gifsService
  constructor (private gifsService: GifsService ){}

  //para poder usarlo necesitamos un método el cual nos va a devolver el array de lo que se agrega
  get tags(): string[]{
    return this.gifsService.tagsHistory;
  }

  organizedTag(tag: string): void{
    this.gifsService.searchTag(tag);
  }
}
