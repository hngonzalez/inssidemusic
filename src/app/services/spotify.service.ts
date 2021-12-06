import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private client_id:string = '890bed2339bb40e689ba8fb83d2024db';
  private client_secret:string = '6a898fa587a5469a9c03abdb8dbc36a8';

  constructor(private http:HttpClient) { }

  /**
   * Obtiene el access token para poder realizar las búsquedas en la API
   */
  async getAccessToken() {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + btoa(this.client_id + ":" + this.client_secret),
      },
      body: "grant_type=client_credentials",
    });
  
    const data = await result.json();
    console.log(data.access_token);
    localStorage.setItem("accessTk", data.access_token);
    console.log(localStorage)
  }

  /**
   * Realiza la búsqueda de la canción, album y género
   * @param param dato a buscar, nombre
   * @returns set de datos obtenidos
   */
  getSong(param:string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('accessTk')
    })

    return  this.http.get(`https://api.spotify.com/v1/search?q=${param}&type=track,album&include_external=audio`, { headers })
  }

  /**
   * Busca top de artistas por país
   * @param param
   */
  getArtist(param:string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('accessTk')
    })

    return  this.http.get(`https://api.spotify.com/v1/search?q=${param}&type=artist`, { headers })
  }

  getTops(idArtist:string, country:string) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('accessTk')
    })

    return  this.http.get(`https://api.spotify.com/v1/artists/${idArtist}/top-tracks?market=${country}`, { headers })
  }


}
