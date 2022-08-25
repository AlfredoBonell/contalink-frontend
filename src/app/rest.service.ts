import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http : HttpClient) { }

  url : string = "http://localhost:8080/controller/getInfoReporte";

  getReporte(fechaInicio : string, fechaFin : string) {

    return this.http.post<any>(this.url, {
      fechaInicio: fechaInicio,
      fechaFin: fechaFin
    });
  }
}
