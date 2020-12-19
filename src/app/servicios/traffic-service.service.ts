import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrafficService {

  private _baseUrlDir = 'https://api.mapbox.com/directions/v5';
  private _baseUrlGeo = 'https://api.mapbox.com/geocoding/v5';


  constructor(private http: HttpClient) { }

  public getCoordenadasInicioDestino(inicio_lng: number, inicio_lat: number, destino_lng: number, destino_lat: number): Observable<any>{

    let coordString = `${inicio_lng},${inicio_lat};${destino_lng},${destino_lat}`;
    let url = `${this._baseUrlDir}/mapbox/driving/${coordString}`;

    const params = new HttpParams()
    .set('alternatives', 'true')
    .set('geometries', 'polyline6')
    .set('steps', 'false')
    .set('access_token', environment.mapbox_key)
    .set('language', 'es');

    return this.http.get<any>(url, {params}).pipe(
      tap(data => JSON.stringify(data))
    );



  }



}
