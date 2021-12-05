import { Component, Input, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input() paramBuscado!:string;
  songsList:any[] = [];
  playing:boolean = false;
  noResultados!:boolean;
  resultados!:number;

  constructor(private spotifyService:SpotifyService) { }

  ngOnInit(): void {
  }

  /**
   * Desde el valor de search, se realiza la búsqueda de la canción y se la asigna a la lista
   */
  getSong() {
    let param = (<HTMLInputElement>document.getElementById("search")).value;
    let toastLive = <HTMLImageElement>document.getElementById('liveToast');
    this.playing = false;

    if (param != '') {
      this.spotifyService.getSong(param)
      .subscribe( (data:any) => {
        console.log(data.tracks.items);
        this.noResultados = false;     
        this.songsList = data.tracks.items;
        this.resultados = this.songsList.length;      
        if (this.resultados == 0) {
          toastLive.className = "toast fade show showing";
        } else {
          toastLive.className = "toast hide";
        }
      }, (error) => {
        this.noResultados = true;
      });
    }
  }

  /**
   * Reproduce la preview y cambia el icono de pause
   * @param preview link de la preview a reproducir
   * @param index index actual de la lista de canciones
   */
  play(preview:string, index:number) {
    console.log(preview);
    if (this.playing == false) {
      let icoPlay = <HTMLLIElement>document.getElementById('playBtn' + index);
      let audio = <HTMLAudioElement>document.getElementById('audio');

      icoPlay.className = 'fa fa-pause';
      this.playing = true;
      audio.src = preview;
      audio.play();
    }
    else {
      this.stop(index);
    }
  }

  /**
   * Reproduce la preview y cambia el icono de play
   * @param index 
   */
  stop(index:number) {
    let icoPause = <HTMLLIElement>document.getElementById('playBtn' + index);
    var audio = <HTMLAudioElement>document.getElementById('audio');

    icoPause.className = 'fa fa-play';
    audio.src = "";
    audio.pause();
    audio.currentTime = 0;
    this.playing = false;
  }

  /**
   * Muestra los valores de la canción actual
   * @param song 
   */
  infoSong(song:any) {
    console.log(song);
    let cover = <HTMLImageElement>document.getElementById('infoSongPhoto');
    let duration = <HTMLSpanElement>document.getElementById('duration');
    let name = <HTMLSpanElement>document.getElementById('name');
    let album = <HTMLSpanElement>document.getElementById('album');
    let minutes = new Date(song.duration_ms);

    cover.src = song.album.images[0].url;
    duration.textContent = `${minutes.getMinutes()}:${minutes.getSeconds()}`;
    name.textContent = song.name;
    album.textContent = song.album.name;
  }

  closeToast() {
    let toastLive = <HTMLImageElement>document.getElementById('liveToast');
    toastLive.className = "toast hide"
  }

}
