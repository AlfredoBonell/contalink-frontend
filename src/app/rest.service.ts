import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Invoice } from './Invoice';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http : HttpClient) { }

  url : string = "http://localhost:8080/controller/getInfoReporte";

  getReporte(fechaInicio : string, fechaFin : string) {

    const formData = new FormData();
    formData.append('fechaInicio', fechaInicio);
    formData.append('fechaFin', fechaFin);

    return this.http.post<Invoice[]>(this.url, formData);
  }
}
