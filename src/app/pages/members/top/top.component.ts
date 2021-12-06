import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {
  songsList:any[] = [];
  resultados!:number;
  noResultados!:boolean;

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit(): void {
  }

  getTops() {
    let param = (<HTMLInputElement>document.getElementById("searchArtista")).value;
    let country = (<HTMLInputElement>document.getElementById("searchCodigo")).value;
    let idArtist = "";

    if (param != '') {
      this.spotifyService.getArtist(param.toLowerCase())
      .subscribe( (data:any) => {
        console.log(data.artists.items[0].id);
        idArtist = data.artists.items[0].id
        this.noResultados = false;
        this.spotifyService.getTops(idArtist, country)
        .subscribe((data:any) => {
          this.songsList = data.tracks;
          this.resultados = this.songsList.length;      
          console.log(this.songsList);
          console.log(localStorage);
        })

      }, (error) => {
        if (error.status == 401) {
          this.spotifyService.getAccessToken();
        }
      });
    }
    
  }

}
